"use client";
import { LessonData, LessonResponse } from "@/interfaces/api";
import { createLesson, updateLesson } from "@/apiService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";

export const useLesson = (courseId: string, lessonId: string, data: LessonResponse | null) => {
    const route = useRouter();
    const [showQA, setShowQA] = useState<boolean>(false);
    const [lessonid, setLessonId] = useState<number | null>(Number(lessonId));
    const translate = useTranslations("messages");
    const [formInput, setFormInput] = useState<LessonData>({
        title: "",
        description: "",
        pre_note: "",
        next_note: "",
        order: 0,
        qaList: [],
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
     * send data lesson to backend and create
     */
  
    const handleSubmit = async () => {
      //Extract qList from data to be sent
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { qaList, ...lessonData } = formInput;
      lessonData.order = Number(lessonData.order);
      try {
        const create = await createLesson(lessonData, courseId);

        if ("error" in create) {
          throw create;
        }

          setLessonId(create.id);
          setShowQA(true);
          Swal.fire({
            icon: "success",
            title: translate("Success"),
            text: translate("The lesson has been created successfully You can add questions to the lesson from the side section"),
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
    const handleUpdate = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { qaList, ...lessonData } = formInput;
      lessonData.order = Number(lessonData.order);
      try {
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
  
    useEffect(() => {
        if (data !== null) {
            setFormInput({
              title: data.title || "",
              description: data.description || "",
              pre_note: data.pre_note || "",
              next_note: data.next_note || "",
              order: data.order || 0,
              qaList: data.question || [],
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
 const handleInputChange = (e: any) => {
  const { name, value } = e.target;
  setFormInput((prevInput) => ({
    ...prevInput,
    [name]: value,
  }));
};

 const handleOnChangeDescription = (value: string) => {
  setFormInput((prevInput) => ({
    ...prevInput,
    description: value,
  }));
};

    return{
        formInput,
        showQA,
        handleUpdate,
        handleSubmit,
        handleSelectChange,
        handleInputChange,
        handleOnChangeDescription
    }
};