import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCourse, updateCourse, uploadFile } from "@/apiService";
import { CourseDifficulty, CourseLanguage } from "@/utils/Enums";
import { useRouter } from "next/navigation";
import { CoursesResponse } from "@/interfaces/api";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";
import {
  courseInfoSchema,
  CourseInfoFormData,
} from "@/schemas/courseInfoSchema";

export const useCourseInfo = (data: CoursesResponse | null) => {
  const router = useRouter();
  const translate = useTranslations("messages");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CourseInfoFormData>({
    resolver: zodResolver(courseInfoSchema),
    mode: "onChange",
    defaultValues: {
      name: data?.name || "",
      title: data?.title || "",
      tag: data?.tag || "",
      difficulty: data?.difficulty as CourseDifficulty || CourseDifficulty.Beginner,
      description: data?.description || "",
      logo: data?.logo || "",
      language: data?.language || CourseLanguage.English,
    },
  });

  const image = watch("logo");

  const handleSelectChange = (selectedOption: any) => {
    setValue("language", selectedOption.value, { shouldValidate: true });
  };

  const handleCroppedImage = async (img: any) => {
    const url = await uploadFile(img);
    // uploadFile returns UploadFileResponse which can be string or error object
    if (typeof url === "string") {
      setValue("logo", url, { shouldValidate: true });
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * This is to send data to the back end in case of creating a new course.
   */
  const onSubmit = async (formData: CourseInfoFormData) => {
    try {
      const create = await createCourse(formData);

      if ("error" in create) {
        throw create;
      }

      Swal.fire({
        icon: "success",
        title: translate("Success"),
        text: translate("The course has been created successfully!"),
      });
      router.push(`/show-lesson/${create.id}/${create.slug}`);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        html: `There was an error creating the course: <b>${error.message}</b>`,
      });
    }
  };

  /**
   * This works when modifying course data and sending data to the back end.
   */
  const onUpdate = async (formData: CourseInfoFormData) => {
    try {
      const update = await updateCourse(formData, data!.id!.toString());

      if ("error" in update) {
        throw update;
      }

      if (update) {
        Swal.fire({
          icon: "success",
          title: translate("Success"),
          text: translate("The course has been updated successfully!"),
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        html: `There was an error updating the course: <b>${error.message}</b>`,
      });
    }
  };

  return {
    register,
    errors,
    watch,
    setValue,
    image,
    handleSubmit: handleFormSubmit(onSubmit),
    handleUpdate: handleFormSubmit(onUpdate),
    fileInputRef,
    handleSelectChange,
    handleCroppedImage,
    handleButtonClick,
  };
};
