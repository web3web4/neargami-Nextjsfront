"use client";
import React, { Dispatch, SetStateAction } from "react";
import AnswerComponent from "@/components/answer/Answer";
import { handleInputChange, handleCheckboxChange } from "./index";
import { Options, QA } from "@/interfaces/qa";

interface AnswerProps {
  data: Options[];
  setFormInput: Dispatch<SetStateAction<QA>>;
}

export default function Answer({ data, setFormInput }: AnswerProps) {
  if (data.length === 0) {
    for (let i = 1; i <= 4; i++) {
      data.push({
        id: i,
        description: "",
        is_correct: false,
        question_id: 0,
      });
    }
  }

  return data?.map((item) => (
    <div key={item.id}>
      <AnswerComponent
        id={item.id.toString()}
        descriptionValue={item.description}
        radioChecked={item.is_correct}
        handleInputChange={(e) => handleInputChange(e, item.id, setFormInput)}
        handleCheckboxChange={(e) =>
          handleCheckboxChange(e, item.id, setFormInput)
        }
      />
    </div>
  ));
}
