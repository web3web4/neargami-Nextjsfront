import { createQA, updateQA } from "@/apiService";
import { QA } from "@/interfaces/qa";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { QAResponse } from "@/interfaces/api";

export const useQA = (courseId: string, lessonId: string, qaId: string, data: QAResponse | null ) => {
  const route = useRouter();
  const [formInput, setFormInput] = useState<QA>({
    description: "",
    options: [],
  });

  /**
   * send data to backend
   */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const hasCorrectAnswer = formInput.options.some(
      (option) => option.is_correct === true
    );

    if (!hasCorrectAnswer) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please select at least one correct answer before submitting.",
      });
      return;
    }

    // extract id answer from array options (answer)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const optionsWithoutId = formInput.options.map(({ id, question_id , ...rest }) => rest);

    //Prepare the sent data without index 0,1,2....etc from array options (answer)
    const updatedFormInput = {
      description: formInput.description,
      options: optionsWithoutId,
    };

    try {
      const create = await createQA(updatedFormInput, courseId, lessonId);
      if (create) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "QA Created successfully!",
        });
        route.push(`/lesson/${courseId}/${lessonId}`);
      }
    } catch (error) {
      const msgError = error instanceof Error && typeof (error.cause as any).message === "string" ?
      (error.cause as any).message : error;
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `There was an error created QA.${msgError}`,
      });
    }
  };

  /**
   * update QA data and send backend
   */
  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const hasCorrectAnswer = formInput.options.some(
      (option) => option.is_correct === true
    );

    if (!hasCorrectAnswer) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please select at least one correct answer before submitting.",
      });
      return;
    }

    //extract question_id from array options (answer)
    const optionsWithoutId = formInput.options.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ question_id, ...rest }) => rest
    );
    
    //Prepare the sent data without index 0,1,2....etc from array options (answer)
    const updatedFormInput = {
      description: formInput.description,
      options: optionsWithoutId,
    };
    try {
      const update = await updateQA(updatedFormInput, courseId, lessonId, qaId);
      if (update) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "QA Updated successfully!",
        });
      }
    } catch (error) {
      console.error("Error updating QA:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error update QA.",
      });
    }
  };

  /**
   * This works when you click on the Edit Course button to retrieve the course data and include this data in the fields.
   */

  useEffect(() => {
      if (data != null) {
          setFormInput({
            description: data.description,
            options: data.answer,
          });
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChangeDescription = (value: string, setFormInput: Dispatch<SetStateAction<QA>>) => {
  setFormInput((prevInput) => ({
    ...prevInput,
    description: value,
  }));
};

  return {
    formInput,
    setFormInput,
    handleSubmit,
    handleUpdate,
    handleOnChangeDescription
  };
};
