"use client";
import styles from "./CourseLesson.module.css";
import Link from "next/link";
import { Lecture } from "@/interfaces/lecture";
import { useEffect, useState } from "react";

const CourseLesson = ({ data }: { data: Lecture[] }) => {
  const [lessons, setLessons] = useState<Lecture[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const sortedData = [...data].sort((a, b) => a.order - b.order);
      setLessons(sortedData);
    }
  }, [data]);

  return (
    <div className={styles.courseLessonStyleWrapper}>
      <div className="container">
        <div className={styles.lessonRow}>
          {lessons?.map((lecture, i) => (
            <div
              key={lecture.id}
              className={`${styles.lessonItem} ${
                lecture?.userLecture &&
                lecture.userLecture.length > 0 &&
                lecture?.userLecture[0]?.end_at !== null &&
                lecture?.userLecture[0]?.end_at !== undefined
                  ? styles.shapeActive
                  : ""
              }`}
            >
              <Link href={`/quiz/${lecture.course.id}/${lecture.id}`}>
                <div className={styles.lessonItemInner}>
                  <h4
                    className={`${styles.lessonTitle} ${
                      lecture?.userLecture &&
                      lecture.userLecture.length > 0 &&
                      lecture?.userLecture[0]?.end_at !== null &&
                      lecture?.userLecture[0]?.end_at !== undefined
                        ? styles.active
                        : ""
                    }`}
                  >
                    Lesson #{lecture.order}
                  </h4>
                  <ul className={styles.lessonCheckList}>
                    <div className={styles.lessonName}>{lecture.title}</div>
                  </ul>
                </div>
              </Link>
              <div className={styles.arrowContent}>
                <h3
                  className={
                    lecture?.userLecture &&
                    lecture.userLecture.length > 0 &&
                    lecture?.userLecture[0]?.end_at !== null &&
                    lecture?.userLecture[0]?.end_at !== undefined
                      ? styles.active
                      : ""
                  }
                >
                  points {lecture.totalPrize}
                </h3>
                {data.length - 1 !== i && <div className={styles.arrowDown} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseLesson;
