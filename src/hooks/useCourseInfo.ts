import { useState, useEffect, useRef } from "react";
import { createCourse, updateCourse, uploadFile } from "@/apiService";
import { CourseDifficulty, CourseLanguage } from "../utils/Enums";
import { useRouter } from "next/navigation";
import { CoursesResponse } from "@/interfaces/api";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";

export const useCourseInfo = (data: CoursesResponse | null) => {
  const router = useRouter();
  const translate = useTranslations("messages");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [formInput, setFormInput] = useState<CoursesResponse>({
    name: "",
    title: "",
    tag: "",
    difficulty: CourseDifficulty.Beginner,
    description: "",
    logo: "",
    slug: "",
    language: CourseLanguage.English,
  });

  const handleSelectChange = (selectedOption: any) => {
    setFormInput((prevInput) => ({
      ...prevInput,
      language: selectedOption.value,
    }));
  };

  const handleCroppedImage = async (img: any) => {
    setImage(img);
    const url = await uploadFile(img);
    setFormInput((prevInput: any) => ({
      ...prevInput,
      logo: url,
    }));
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (data !== null) {
      setFormInput({
        name: data!.name,
        title: data!.title,
        difficulty: data!.difficulty,
        description: data!.description,
        logo: data!.logo,
        tag: data!.tag,
        slug: data!.slug,
        language: data!.language,
      });
      setImage(data!.logo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * This is to send data to the back end in case of creating a new course.
   */
  const handleSubmit = async () => {
    if (!formInput.tag || !formInput.tag.trim()) {
      Swal.fire({
        icon: "warning",
        title: translate("Required Field"),
        text: translate(
          "The Tags field is required Please enter all related tags"
        ),
      });
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { slug, ...courseData } = formInput;
      const create = await createCourse(courseData);
      Swal.fire({
        icon: "success",
        title: translate("Success"),
        text: translate("The course has been created successfully!"),
      });
      router.push(`/show-lesson/${create.id}/${create.slug}`);
    } catch (error) {
      const msgError =
        error instanceof Error &&
        error.cause &&
        typeof (error.cause as any).message === "string"
          ? (error.cause as any).message
          : error;
      Swal.fire({
        icon: "error",
        title: "Error",
        html: `There was an error creating the course: <b>${msgError}</b>`,
      });
    }
  };

  /**
   * This works when modifying course data and sending data to the back end.
   */
  const handleUpdate = async () => {
    if (!formInput.tag || !formInput.tag.trim()) {
      Swal.fire({
        icon: "warning",
        title: translate("Required Field"),
        text: translate(
          "The Tags field is required Please enter all related tags"
        ),
      });
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { slug, ...courseData } = formInput;
      const update = await updateCourse(courseData, data!.id!.toString());
      if (update) {
        Swal.fire({
          icon: "success",
          title: translate("Success"),
          text: translate("The course has been updated successfully!"),
        });
      }
    } catch (error) {
      const msgError =
        error instanceof Error &&
        error.cause &&
        typeof (error.cause as any).message === "string"
          ? (error.cause as any).message
          : error;
      Swal.fire({
        icon: "error",
        title: "Error",
        html: `There was an error updating the course: <b>${msgError}</b>`,
      });
    }
  };

  return {
    formInput,
    image,
    handleSubmit,
    handleUpdate,
    fileInputRef,
    handleSelectChange,
    handleCroppedImage,
    handleButtonClick,
    handleInputChange,
  };
};
