"use client";
import { LessonResponse } from "@/interfaces/api";
import { Question } from "@/interfaces/lecture";
import { createLesson, updateLesson } from "@/apiService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { lessonSchema, LessonFormData } from "@/schemas/lessonSchema";

export const useLesson = (
  courseId: string,
  lessonId: string,
  data: LessonResponse | null
) => {
  const route = useRouter();
  const [showQA, setShowQA] = useState<boolean>(false);
  const [lessonid, setLessonId] = useState<number | null>(Number(lessonId));
  const [qaList, setQaList] = useState<Question[]>([]);
  const translate = useTranslations("messages");

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    mode: "onChange",
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      pre_note: data?.pre_note || "",
      next_note: data?.next_note || "",
      order: data?.order || 0,
    },
  });

  /**
   * if edite lesson QA shaow or hide
   */
  useEffect(() => {
    if (Number(lessonId)) {
      setShowQA(true);
    }
  }, [lessonId]);

  /**
   * Update qaList when data changes
   */
  useEffect(() => {
    if (data !== null) {
      setQaList(data.question || []);
    }
  }, [data]);

  /**
   * send data lesson to backend and create
   */

  const onSubmit = async (formData: LessonFormData) => {
    try {
      // Convert optional fields to empty strings for API compatibility
      const lessonData = {
        ...formData,
        pre_note: formData.pre_note || "",
        next_note: formData.next_note || "",
      };
      const create = await createLesson(lessonData, courseId);

      if ("error" in create) {
        throw create;
      }

      setLessonId(create.id);
      setShowQA(true);
      Swal.fire({
        icon: "success",
        title: translate("Success"),
        text: translate(
          "The lesson has been created successfully You can add questions to the lesson from the side section"
        ),
      });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error: any) {
      console.error("Error in creating Lesson:", error.message);
      Swal.fire({
        icon: "error",
        title: translate("Error"),
        text: translate("There was an error creating the lesson"),
      });
    }
  };

  /**
   * redirect after add QA into store QA interface
   */

  const handleSelectChange = () => {
    route.push(`/question-answer/${courseId}/${lessonid}/add`);
  };

  /**
   * update date lesson
   */
  const onUpdate = async (formData: LessonFormData) => {
    try {
      // Convert optional fields to empty strings for API compatibility
      const lessonData = {
        ...formData,
        pre_note: formData.pre_note || "",
        next_note: formData.next_note || "",
      };
      const update = await updateLesson(lessonData, courseId, lessonId);

      if ("error" in update) {
        throw update;
      }

      Swal.fire({
        icon: "success",
        title: translate("Success"),
        text: translate("The lesson has been updated successfully!"),
      });
    } catch (error: any) {
      console.error("Error in update Lesson:", error.message);
      Swal.fire({
        icon: "error",
        title: translate("Error"),
        text: translate("There was an error update the lesson"),
      });
    }
  };

  return {
    register,
    errors,
    watch,
    setValue,
    qaList,
    showQA,
    handleSubmit: handleFormSubmit(onSubmit),
    handleUpdate: handleFormSubmit(onUpdate),
    handleSelectChange,
  };
};