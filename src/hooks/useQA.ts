"use client";
import { createQA, updateQA } from "@/apiService";
import { Options, QA } from "@/interfaces/qa";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { QAResponse } from "@/interfaces/api";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { qaSchema, QAFormData } from "@/schemas/qaSchema";

export const useQA = (
  courseId: string,
  lessonId: string,
  qaId: string,
  data: QAResponse | null
) => {
  const route = useRouter();
  const translate = useTranslations("messages");

  const {
    handleSubmit: handleFormSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<QAFormData>({
    resolver: zodResolver(qaSchema),
    mode: "onChange",
    defaultValues: {
      description: data?.description || "",
    },
  });

  const [options, setOptions] = useState<Options[]>([]);

  /**
   * Compatibility layer for Answers component which expects formInput.options and setFormInput
   */
  const formInput = {
    description: watch("description"),
    options: options,
  };

  const setFormInput: Dispatch<SetStateAction<QA>> = (value) => {
    if (typeof value === "function") {
      setOptions((prev) => {
        const result = value({ description: formInput.description, options: prev });
        return result.options;
      });
    } else {
      setOptions(value.options);
    }
  };

  const handleOnChangeDescription = (value: string) => {
    setValue("description", value, { shouldValidate: true });
  };

  /**
   * send data to backend
   */
  const onSubmit = async (formData: QAFormData) => {
    const hasCorrectAnswer = options.some((option) => option.is_correct === true);

    if (!hasCorrectAnswer) {
      Swal.fire({
        icon: "warning",
        title: translate("Warning"),
        text: translate(
          "Please select at least one correct answer before submitting"
        ),
      });
      return;
    }

    // extract id answer from array options (answer)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const optionsWithoutId = options.map(({ id, question_id, ...rest }) => rest);

    const updatedFormInput = {
      description: formData.description,
      options: optionsWithoutId,
    };

    try {
      const create = await createQA(updatedFormInput, courseId, lessonId);

      if ("error" in create) {
        throw create;
      }

      if (create) {
        Swal.fire({
          icon: "success",
          title: translate("Success"),
          text: translate("QA Created successfully!"),
        });
        route.push(`/lesson/${courseId}/${lessonId}`);
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: translate("Error"),
        text: `${translate("There was an error created QA")}.${error.message}`,
      });
    }
  };

  /**
   * update QA data and send backend
   */
  const onUpdate = async (formData: QAFormData) => {
    const hasCorrectAnswer = options.some((option) => option.is_correct === true);

    if (!hasCorrectAnswer) {
      Swal.fire({
        icon: "warning",
        title: translate("Warning"),
        text: translate(
          "Please select at least one correct answer before submitting"
        ),
      });
      return;
    }

    //extract question_id from array options (answer)
    const optionsWithoutId = options.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ question_id, created_at, updated_at, ...rest }) => rest
    );

    const updatedFormInput = {
      description: formData.description,
      options: optionsWithoutId,
    };

    try {
      const update = await updateQA(updatedFormInput, courseId, lessonId, qaId);

      if ("error" in update) {
        throw update;
      }

      if (update) {
        Swal.fire({
          icon: "success",
          title: translate("Success"),
          text: translate("QA Updated successfully!"),
        });
      }
    } catch (error: any) {
      console.error("Error updating QA:", error.message);
      Swal.fire({
        icon: "error",
        title: translate("Error"),
        text: translate("Warning"),
      });
    }
  };

  /**
   * This works when you click on the Edit Course button to retrieve the course data and include this data in the fields.
   */
  useEffect(() => {
    if (data != null) {
      reset({
        description: data.description,
      });
      setOptions(data.answer);
    }
  }, [data, reset]);

  return {
    formInput,
    setFormInput,
    errors,
    handleSubmit: handleFormSubmit(onSubmit),
    handleUpdate: handleFormSubmit(onUpdate),
    handleOnChangeDescription,
  };
};
