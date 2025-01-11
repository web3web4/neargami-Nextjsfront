"use client";
import CharacterCounter from "@/components/characterCounter/CharacterCounter";
import { courseDifficultyList, languageOptions, customStyles } from "./index";
import { useCourseInfo } from "@/hooks/useCourseInfo";
import { CoursesResponse } from "@/interfaces/api";
import uploadIcon from "@/assets/images/icons/uploadIcon.svg";
import RichBoxQuill from "@/components/richBoxQuill/RichBoxQuill";
import CropImage from "@/components/cropImage/CropImage";
import React, { Fragment } from "react";
import styles from "./CourseInfo.module.css";
import Button from "@/components/button/Button";
import Select from "react-select";
import Image from "next/image";

export default function CourseInfo({
  courseId,
  data,
}: {
  courseId: string;
  data: CoursesResponse | null;
}) {
  const {
    fileInputRef,
    formInput,
    image,
    handleSubmit,
    handleUpdate,
    handleSelectChange,
    handleCroppedImage,
    handleButtonClick,
    handleInputChange,
  } = useCourseInfo(courseId, data);

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
                    <h6>Course Name</h6>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter the course name"
                      maxLength={50}
                      value={formInput.name}
                      onChange={handleInputChange}
                    />
                    <CharacterCounter
                      currentCount={formInput.name?.length}
                      maxCount={50}
                    />
                  </div>
                  <div className={styles.fieldContent}>
                    <h6>Course Description</h6>
                    <textarea
                      className={styles.styledTextArea}
                      name="title"
                      placeholder="Ex: Learn about near protocol and ......."
                      maxLength={150}
                      value={formInput.title}
                      onChange={handleInputChange}
                    />
                    <CharacterCounter
                      currentCount={formInput.title?.length}
                      maxCount={150}
                    />
                  </div>
                  <div className={styles.fieldContent}>
                    <h6>Course Tags</h6>
                    <input
                      type="text"
                      name="tag"
                      placeholder="Tags of the course like: JavaScript, Smart-Contract, AI ..."
                      maxLength={150}
                      value={formInput.tag}
                      onChange={handleInputChange}
                    />
                    <CharacterCounter
                      currentCount={formInput.tag?.length}
                      maxCount={150}
                    />
                  </div>
                  {/* Start Radio Option */}
                  <div className={styles.fieldContent}>
                    <h6>Course Difficulty</h6>
                    <div className={styles.courseDifficulty}>
                      <div className="flex-grow-1">
                        {courseDifficultyList
                          .slice(0, Math.ceil(courseDifficultyList.length / 2))
                          .map((difficulty, index) => (
                            <div key={index}>
                              <input
                                type="radio"
                                name="difficulty"
                                value={difficulty.value}
                                checked={
                                  formInput.difficulty === difficulty.value
                                }
                                onChange={handleInputChange}
                              />
                              <label>{difficulty.label}</label>
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
                                name="difficulty"
                                value={difficulty.value}
                                checked={
                                  formInput.difficulty === difficulty.value
                                }
                                onChange={handleInputChange}
                              />
                              <label>{difficulty.label}</label>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  {/* End Radio Option */}
                  <div className={styles.fieldContent}>
                    <h6>Course Logo</h6>
                    <div className={styles.courseLogo}>
                      <label>Upload from your Device</label>
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
                    <h6>Course Language</h6>
                    <div id="selector">
                      <Select
                        styles={customStyles}
                        options={languageOptions}
                        placeholder="Select language a course"
                        value={languageOptions.find(
                          (option) => option.value === formInput.language
                        )}
                        onChange={handleSelectChange}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.rightContent}>
                  <div>
                    <h6>Course Out Lines</h6>
                    <div className={styles.discriptionQuill}>
                      <RichBoxQuill
                        placeholder="Enter a detailed outline of the course"
                        value={formInput.description}
                        onChange={(val) =>
                          handleInputChange({
                            target: { name: "description", value: val },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 btu">
                <Button
                  variant="mint"
                  size="lg"
                  onClick={!Number(courseId) ? handleSubmit : handleUpdate}
                >
                  {!Number(courseId) ? "Add and Edit Lessons" : "Update"}
                </Button>
              </div>
              <div className="mt-3 btu">
                {Number(courseId) ? (
                  <Button
                    variant="mint"
                    size="lg"
                    href={`/show-lesson/${courseId}`}
                  >
                    Edit Lessons
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
