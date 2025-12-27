"use client";
import { Button, ListManager, RichBoxQuill, FormError } from "@/components";
import { LessonResponse } from "@/interfaces";
import { useTranslations } from "next-intl";
import { useLesson } from "@/hooks";
import React from "react";
import styles from "./Lesson.module.css";


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
    register,
    errors,
    watch,
    setValue,
    qaList,
    showQA,
    handleSubmit,
    handleUpdate,
    handleSelectChange,
  } = useLesson(courseId, lessonId, data);

  const descriptionValue = watch("description") || "";
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
                    placeholder={translate("Enter your lesson name")}
                    {...register("title")}
                  />
                  <FormError message={errors.title?.message} className={styles.errorMessage} />
                </div>
                <div>
                  <h6>{translate("Discription")}</h6>
                  <div className={styles.discriptionQuill}>
                    <RichBoxQuill
                      placeholder={translate("Enter discription talking about this lesson")}
                      value={descriptionValue}
                      onChange={(val) => setValue("description", val, { shouldValidate: true })}
                    />
                    <FormError message={errors.description?.message} className={styles.errorMessage} />
                  </div>


                </div>
                <div>
                  <h6>{translate("Pre Lesson Note")}</h6>
                  <input
                    type="text"
                    placeholder={translate("Enter pre note")}
                    {...register("pre_note")}
                  />
                  <FormError message={errors.pre_note?.message} className={styles.errorMessage} />                </div>
                <div>
                  <h6>{translate("After Lesson Note")}</h6>
                  <input
                    type="text"
                    placeholder={translate("Enter next note")}
                    {...register("next_note")}
                  />
                  <FormError message={errors.next_note?.message} className={styles.errorMessage} />
                </div>

                <div>
                  <h6>{translate("Lesson arrangement")}</h6>
                  <input
                    type="number"
                    placeholder={translate("Lesson arrangement")}
                    {...register("order", { valueAsNumber: true })}
                  />
                  <FormError message={errors.order?.message} className={styles.errorMessage} />
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
                      initialData={qaList}
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
