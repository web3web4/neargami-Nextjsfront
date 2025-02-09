"use client";
import styles from "./QuizContent.module.css";
import CourseContent from "./CourseContent/CourseContent";
import QuestionContent from "./QuestionContent/QuestionContent";
import { QAResponse } from "@/interfaces/api";
import { useAuth } from "@/context/authContext";
import { useTranslations } from "next-intl";

interface QuizContentProps {
  courseId: string;
  lectureId: string;
  data: QAResponse[];
}

export default function QuizContent({
  courseId,
  lectureId,
  data,
}: QuizContentProps) {
  const translate = useTranslations("messages");
  const { jwtToken } = useAuth();
  let description: string = data[0]?.lecture.description;
  let warningMessage: string = "";

  if (!jwtToken) {
    description =
      description.split(" ").slice(0, 120).join(" ") +
      (description.split(" ").length >= 120 ? "..." : "");

    warningMessage = translate("Please Login To Read Full Lesson");
  }

  return (
    <div className={styles.quizContent}>
      <div className={styles.section1}>
        <CourseContent data={description} warningMessage={warningMessage} />
      </div>
      {jwtToken && (
        <div className={styles.section2}>
          <QuestionContent
            courseId={courseId}
            lectureId={lectureId}
            data={data}
          />
        </div>
      )}
    </div>
  );
}
