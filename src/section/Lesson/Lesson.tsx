"use client";
import React from "react";
import styles from "./Lesson.module.css";
import Button from "@/components/button/Button";
import ListManager from "@/components/listManager/ListManager";
import RichBoxQuill from "@/components/richBoxQuill/RichBoxQuill";
import { LessonResponse } from "@/interfaces/api";
import { useLesson } from "@/hooks/useLesson";
import { useTranslations } from "next-intl";

export default function Lesson({
  courseId,
  lessonId,
  data,
}: {
  courseId: string;
  lessonId: string;
  data: LessonResponse | null;
}) {
  const {
    formInput,
    showQA,
    handleUpdate,
    handleSubmit,
    handleSelectChange,
    handleInputChange,
    handleOnChangeDescription,
  } = useLesson(courseId, lessonId, data);
  const translate = useTranslations("Lesson");

  return (
    <div className={styles.lessonWrapper}>
      <div className="container">
        <div className="row">
          <form>
            <div className={styles.editLesson}>
              <div className={styles.leftContent}>
                <h4 className="mb-3">{translate("Main Info")}</h4>
                <div>
                  <h6>{translate("Lesson Name")}</h6>
                  <input
                    type="text"
                    name="title"
                    placeholder={translate("Enter your lesson name")}
                    value={formInput.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <h6>{translate("Discription")}</h6>
                  <div className={styles.discriptionQuill}>
                    <RichBoxQuill
                      placeholder={translate("Enter discription talking about this lesson")}
                      value={formInput.description || ""}
                      onChange={(val) => handleOnChangeDescription(val)}
                    />
                  </div>
                </div>
                <div>
                  <h6>{translate("Pre Lesson Note")}</h6>
                  <input
                    type="text"
                    name="pre_note"
                    placeholder={translate("Enter pre note")}
                    value={formInput.pre_note}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <h6>{translate("After Lesson Note")}</h6>
                  <input
                    type="text"
                    name="next_note"
                    placeholder={translate("Enter next note")}
                    value={formInput.next_note}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <h6>{translate("Lesson arrangement")}</h6>
                  <input
                    type="number"
                    name="order"
                    placeholder={translate("Lesson arrangement")}
                    value={formInput.order}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mt-3">
                  <Button
                    variant="mint"
                    size="lg"
                    onClick={Number(lessonId) ? handleUpdate : handleSubmit}
                  >
                    {translate("Save And Publish")}
                  </Button>
                </div>
              </div>

              {showQA && (
                <div className={styles.rightContent}>
                  <h4 className="mb-3">{translate("Add Q/A")}</h4>
                  <select
                    id="qa-type"
                    name="qa-type"
                    value="Choose Q/A Type"
                    onChange={handleSelectChange}
                  >
                    <option value="Choose Q/A Type" disabled>
                    {translate("Choose Q/A Type")}
                    </option>
                    <option value={translate("Multiple-choice questions")}>
                    {translate("Multiple-choice questions")}
                    </option>
                  </select>
                  <div>
                    <ListManager
                      initialData={formInput.qaList}
                      mainField={"description"}
                      href={`/question-answer/${courseId}/${lessonId}`}
                      idField={"id"}
                      arrangeFild={"sequence"}
                    />
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
