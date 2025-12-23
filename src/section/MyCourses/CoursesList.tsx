"use client";
import { Fragment } from "react";
import CourseCard from "./CourseCard/CourseCard";
import { MyCourses } from "@/interfaces/course";
import styles from "./CoursesList.module.css";

interface CourseList {
  courses: MyCourses[],
}

const CoursesList = ({ courses }: CourseList) => {

  return courses.length > 0 ? (
    <div className={styles.CoursesListStyleWrapper}>
      <CourseCard data={courses} />
    </div>
  ) : (
    <Fragment />
  );
};
export default CoursesList;
