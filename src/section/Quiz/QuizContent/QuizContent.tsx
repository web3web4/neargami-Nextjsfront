"use client";
import styles from "./QuizContent.module.css";
import CourseContent from "./CourseContent/CourseContent";
import QuestionContent from "./QuestionContent/QuestionContent";
import { QAResponse } from "@/interfaces/api";
import { useAuth } from "@/context/authContext";
import { useTranslations } from "next-intl";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import arrowDownIcon from "@/assets/images/icons/arrowDown4.png";

interface QuizContentProps {
  courseId: string;
  lectureId: string;
  data: QAResponse[];
}

export default function QuizContent({ courseId, lectureId, data }: QuizContentProps) {
  const translate = useTranslations("messages");
  const { jwtToken } = useAuth();
  const section2Ref = useRef<HTMLDivElement>(null);
  const [showArrow, setShowArrow] = useState(true);
  let description: string = data[0]?.lecture.description;
  let warningMessage: string = "";

  if (!jwtToken) {
    description =
      description.split(" ").slice(0, 150).join(" ") +
      (description.split(" ").length >= 150 ? "..." : "");

    warningMessage = translate("Please Login To Read Full Lesson");
  }

  const scrollToSection2 = () => {
    section2Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!jwtToken || !section2Ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowArrow(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px 0px 0px'
      }
    );

    observer.observe(section2Ref.current);

    return () => observer.disconnect();
  }, [jwtToken]);

  return (
    <div className={styles.quizContent}>
      <div className={styles.section1}>
        <CourseContent data={description} warningMessage={warningMessage} />
        {jwtToken && showArrow && (
          <button 
            className={styles.scrollArrow}
            onClick={scrollToSection2}
            aria-label="Scroll to questions"
          >
            <Image 
              src={arrowDownIcon}
              alt="Scroll down arrow"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
      {jwtToken && (
        <div className={styles.section2} ref={section2Ref}>
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
