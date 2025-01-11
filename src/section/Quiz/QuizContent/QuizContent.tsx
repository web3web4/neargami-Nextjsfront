import styles from "./QuizContent.module.css";
import CourseContent from "./CourseContent/CourseContent";
import QuestionContent from "./QuestionContent/QuestionContent";
import { QAResponse } from "@/interfaces/api";

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
  return (
    <div className={styles.quizContent}>
      <div className={styles.section1}>
        <CourseContent data={data[0]?.lecture.description} />
      </div>
      <div className={styles.section2}>
        <QuestionContent courseId={courseId} lectureId={lectureId} data={data}/>
      </div>
    </div>
  );
}
