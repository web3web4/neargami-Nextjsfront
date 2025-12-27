"use client";
import { CharacterCounter, RichBoxQuill, CropImage, Button, FormError } from "@/components";
import { courseDifficultyList, languageOptions, customStyles } from "./index";
import uploadIcon from "@/assets/images/icons/uploadIcon.svg";
import { CoursesResponse } from "@/interfaces";
import { useTranslations } from "next-intl";
import { useCourseInfo } from "@/hooks";
import React, { Fragment } from "react";
import Select from "react-select";
import Image from "next/image";
import styles from "./CourseInfo.module.css";

export default function CourseInfo({
  isEdit,
  data,
}: {
  isEdit: boolean;
  data: CoursesResponse | null;
}) {
  const {
    register,
    errors,
    watch,
    setValue,
    image,
    handleSubmit,
    handleUpdate,
    fileInputRef,
    handleSelectChange,
    handleCroppedImage,
    handleButtonClick,
  } = useCourseInfo(data);

  const nameValue = watch("name") || "";
  const titleValue = watch("title") || "";
  const tagValue = watch("tag") || "";
  const descriptionValue = watch("description") || "";
  const difficultyValue = watch("difficulty");
  const languageValue = watch("language");
  const translate = useTranslations("CourseInfo");
  const transDifficulty = useTranslations("CourseDifficulty");

  return (
    <Fragment>
      <CropImage
        onCropComplete={handleCroppedImage}
        fileInputRef={fileInputRef}
      />
      <div className={styles.courseInfoWrapper}>
        <div className="container">
          <div className="row">
            <form>
              <div className={styles.courseInfo}>
                <div className={styles.leftContent}>
                  <div className={styles.fieldContent}>
                    <h6>{translate("Course Name")}</h6>
                    <input
                      type="text"
                      placeholder={translate("Enter the course name")}
                      maxLength={50}
                      {...register("name")}
                    />
                    <FormError message={errors.name?.message} />
                    <CharacterCounter
                      currentCount={nameValue.length}
                      maxCount={50}
                    />
                  </div>
                  <div className={styles.fieldContent}>
                    <h6>{translate("Course Description")}</h6>
                    <textarea
                      className={styles.styledTextArea}
                      placeholder={translate(
                        "Ex: Learn about near protocol and"
                      )}
                      maxLength={150}
                      {...register("title")}
                    />
                    <FormError message={errors.title?.message} />
                    <CharacterCounter
                      currentCount={titleValue.length}
                      maxCount={150}
                    />
                  </div>
                  <div className={styles.fieldContent}>
                    <h6>{translate("Course Tags")}</h6>
                    <input
                      type="text"
                      placeholder={translate(
                        "Tags of the course like: JavaScript, Smart-Contract, AI"
                      )}
                      maxLength={150}
                      {...register("tag")}
                    />
                    <FormError message={errors.tag?.message} />
                    <CharacterCounter
                      currentCount={tagValue.length}
                      maxCount={150}
                    />
                  </div>
                  {/* Start Radio Option */}
                  <div className={styles.fieldContent}>
                    <h6>{translate("Course Difficulty")}</h6>
                    <div className={styles.courseDifficulty}>
                      <div className="flex-grow-1">
                        {courseDifficultyList
                          .slice(0, Math.ceil(courseDifficultyList.length / 2))
                          .map((difficulty, index) => (
                            <div key={index}>
                              <input
                                type="radio"
                                value={difficulty.value}
                                checked={difficultyValue === difficulty.value}
                                {...register("difficulty")}
                              />
                              <label>{`${index + 1}${". "} ${transDifficulty(difficulty.label)}`}</label>
                            </div>
                          ))}
                      </div>
                      <div className="flex-grow-1">
                        {courseDifficultyList
                          .slice(Math.ceil(courseDifficultyList.length / 2))
                          .map((difficulty, index) => (
                            <div key={index}>
                              <input
                                type="radio"
                                value={difficulty.value}
                                checked={difficultyValue === difficulty.value}
                                {...register("difficulty")}
                              />
                              <label>{`${index + 4}${". "} ${transDifficulty(difficulty.label)}`}</label>
                            </div>
                          ))}
                      </div>
                    </div>
                    <FormError message={errors.difficulty?.message} />
                  </div>
                  {/* End Radio Option */}
                  <div className={styles.fieldContent}>
                    <h6>{translate("Course Logo")}</h6>
                    <div className={styles.courseLogo}>
                      <label>{translate("Upload from your Device")}</label>
                      <Image
                        src={image ? image : uploadIcon}
                        alt=""
                        width={image !== null ? 80 : 100}
                        height={image !== null ? 80 : 100}
                        onClick={handleButtonClick}
                        style={{
                          padding: image !== null ? "10px 0px" : "0px",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <h6>{translate("Course Language")}</h6>
                    <div id="selector">
                      <Select
                        styles={customStyles}
                        options={languageOptions}
                        placeholder={translate("Select language a course")}
                        value={languageOptions.find(
                          (option) => option.value === languageValue
                        )}
                        onChange={handleSelectChange}
                      />
                    </div>
                    <FormError message={errors.language?.message} />
                  </div>
                </div>

                <div className={styles.rightContent}>
                  <div>
                    <h6>{translate("Course Out Lines")}</h6>
                    <div className={styles.discriptionQuill}>
                      <RichBoxQuill
                        placeholder={translate(
                          "Enter a detailed outline of the course"
                        )}
                        value={descriptionValue}
                        onChange={(val) =>
                          setValue("description", val, { shouldValidate: true })
                        }
                      />
                    </div>
                    <FormError message={errors.description?.message} />
                  </div>
                </div>
              </div>
              <div className="mt-3 btu">
                <Button
                  variant="mint"
                  size="lg"
                  onClick={!isEdit ? handleSubmit : handleUpdate}
                >
                  {!isEdit
                    ? translate("Add and Edit Lessons")
                    : translate("Update")}
                </Button>
              </div>
              <div className="mt-3 btu">
                {isEdit ? (
                  <Button
                    variant="mint"
                    size="lg"
                    href={`/show-lesson/${data?.id}/${data?.slug}`}
                  >
                    {translate("Edit Lessons")}
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
