"use client";
import { Fragment } from "react";
import CourseCard from "./CourseCard/CourseCard";
import styles from "./CoursesInProgress.module.css";
import { useHome } from "@/hooks/useHome";

const CoursesInProgress = () => {
  const { courses } = useHome();

  return courses.length > 0 ? (
    <div className={styles.CoursesInProgressStyleWrapper}>
      <CourseCard data={courses} />
    </div>
  ) : (
    <Fragment />
  );
};
export default CoursesInProgress;
