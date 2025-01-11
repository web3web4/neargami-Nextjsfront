"use client";
import React from "react";
import styles from "./QA.module.css";
import Button from "@/components/button/Button";
import RichBoxQuill from "@/components/richBoxQuill/RichBoxQuill";
import Answers from "./Answers/Answers";
import { useQA } from "@/hooks/useQA";
import { QAResponse } from "@/interfaces/api";

interface QAProps {
  courseId: string;
  lessonId: string;
  qaId: string;
  data: QAResponse | null
}

export default function QA({ courseId, lessonId, qaId, data }: QAProps) {
  const { formInput, setFormInput, handleSubmit, handleUpdate, handleOnChangeDescription } = useQA(
    courseId,
    lessonId,
    qaId,
    data
  );

  return (
    <div className={styles.qaStyleWrapper}>
      <div className="container">
        <div className="row">
          <form>
            <div className={styles.editLesson}>
              <div className={styles.leftContent}>
                <div>
                  <h4>Question</h4>
                  <div className={styles.discriptionQuill}>
                    <RichBoxQuill
                      placeholder="Enter discription talking about this course"
                      value={formInput.description}
                      onChange={(val) =>
                        handleOnChangeDescription(val, setFormInput)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className={styles.rightContent}>
                <div>
                  <h4>The Answer</h4>
                  <Answers
                    data={formInput.options}
                    setFormInput={setFormInput}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="mt-3">
          <Button
            variant="mint"
            size="lg"
            onClick={Number(qaId) ? handleUpdate : handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
