"use client"; // need refactor
import { useEffect, useState } from "react";
import styles from "./CourseLesson.module.css";
import Link from "next/link";
import { Lecture } from "@/interfaces/lecture";

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
          {lessons?.map((data, i) => (
            <div
              key={data.id}
              className={`${styles.lessonItem} ${
                data?.userLecture[0]?.end_at !== null &&
                data?.userLecture[0]?.end_at !== undefined
                  ? styles.shapeActive
                  : ""
              }`}
            >
              <Link href={`/quiz/${data.course.id}/${data.id}`}>
                <div className={styles.lessonItemInner}>
                  <h4
                    className={`${styles.lessonTitle} ${
                      data?.userLecture[0]?.end_at !== null &&
                      data?.userLecture[0]?.end_at !== undefined
                        ? styles.active
                        : ""
                    }`}
                  >
                    Lesson #{data.order}
                  </h4>
                  <ul className={styles.lessonCheckList}>
                    <div className={styles.lessonName}>{data.title}</div>
                  </ul>
                </div>
              </Link>
              <div className={styles.arrowContent}>
                <h3
                  className={
                    data?.userLecture[0]?.end_at !== null &&
                    data?.userLecture[0]?.end_at !== undefined
                      ? styles.active
                      : ""
                  }
                >
                  points {data.question.length * 10}
                </h3>
                {lessons.length - 1 !== i && (
                  <div className={styles.arrowDown} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseLesson;
