"use client";
import { Fragment, useEffect, useState } from "react";
import CourseCard from "./CourseCard/CourseCard";
import styles from "./CoursesInProgress.module.css";
import { CourseInProgress } from "@/interfaces/course";
import { getCoursesInProgress } from "@/apiService";
import { useAuth } from "@/context/authContext";

const CoursesInProgress = () => {
  const [courses, setCourses] = useState<CourseInProgress[]>([]);
  const { jwtToken } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCoursesInProgress();
        if (response) {
          const coursesData = response;
          setCourses(coursesData);
        }
      } catch (error) {
        console.error("Error fetching courses data:", error);
      }
    };

    if (jwtToken) fetchCourses();
  }, [jwtToken]);

  return courses.length > 0 ? (
    <div className={styles.CoursesInProgressStyleWrapper}>
      <CourseCard data={courses} />
    </div>
  ) : (
    <Fragment />
  );
};
export default CoursesInProgress;
