"use client";
import { useQuizContent } from "@/hooks/useQuizContent";
import styles from "./QuestionContent.module.css";
import ProgressBar from "@/components/progressBar/ProgressBar";
import CourseTitle from "./CourseTitle/CourseTitle";
import correctIcon from "@/assets/images/icons/correct.png";
import unCorrectIcon from "@/assets/images/icons/unCorrect.png";
import Image from "next/image";
import { QAResponse } from "@/interfaces/api";

interface QuizContentProps {
  courseId: string;
  lectureId: string;
  data: QAResponse[];
}

export default function QuestionContent({
  courseId,
  lectureId,
  data,
}: QuizContentProps) {
  const {
    currentQuestionSequence,
    sortedQuestions,
    isCorrect,
    answers,
    currentQuestion,
    selectedAnswers,
    handleAnswerChange,
    handleCheckAnswers,
    handleNextQuestion,
  } = useQuizContent(courseId, lectureId, data);
  return (
    <div className={styles.contentRight}>
      {/* Start Title */}
      <CourseTitle
        courseLogo={data[0]?.lecture.course.logo}
        lessonNumber={data[0]?.lecture.order}
        points={10}
      />
      {/* End Title */}
      {/* Start Progress */}
      <div className={styles.progreess}>
        <h6>Progress</h6>
        <ProgressBar
          progress={`${
            (currentQuestionSequence / sortedQuestions.length) * 100
          }%`}
        />
        <div className={styles.number}>
          {currentQuestionSequence}/{sortedQuestions.length}
        </div>
      </div>
      {/* End Progress */}
      {/* Start Section Answer */}
      {isCorrect !== null && (
        <div>
          {isCorrect ? (
            <h4 style={{ color: "var(--green-color)", width: "100%" }}>
              <Image src={correctIcon} width={30} alt="" />
              Correct
            </h4>
          ) : (
            <div>
              <h5 style={{ color: "#ff4747", width: "100%" }}>
                <Image src={unCorrectIcon} width={30} alt="" />
                Incorrect Answer
              </h5>
              <h6>Correct Answers:</h6>
              <ul>
                {answers?.correctAnswers
                  ?.filter((answer) => answer.is_correct)
                  .map((answer, index) => (
                    <li key={index}>{answer.description}</li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {isCorrect === null && (
        <>
          <h5>
            <div
              dangerouslySetInnerHTML={{
                __html: currentQuestion?.description ?? "",
              }}
            />
          </h5>

          {currentQuestion?.answer?.map((answer: any) =>
            answer.description.trim() ? (
              <div className={styles.answerOption} key={answer.id}>
                <input
                  type="checkbox"
                  id={`option${answer.id}`}
                  checked={selectedAnswers.includes(answer.id)}
                  onChange={() => handleAnswerChange(answer.id)}
                />
                <label
                  htmlFor={`option${answer.id}`}
                  className={styles.answerButton}
                >
                  {answer.description}
                </label>
              </div>
            ) : null
          )}
        </>
      )}
      {/* End Section Answer */}
      {/* Start Check Button */}
      {isCorrect === null && (
        <div className={styles.checkBtnContainer}>
          <button className={styles.checkBtn} onClick={handleCheckAnswers}>
            Check
          </button>
        </div>
      )}

      {/* End Check Button */}
      {/* Start Next Button */}
      <div className={styles.nextBtnContainer}>
        <button
          className={styles.nextBtn}
          onClick={handleNextQuestion}
          style={{
            background:
              currentQuestionSequence === sortedQuestions.length
                ? "var(--green-color)"
                : "#303048",
            position:
              currentQuestionSequence === sortedQuestions.length
                ? "fixed"
                : "absolute",
          }}
        >
          <h4 style={{ marginBottom: "0px" }}>
            {currentQuestionSequence === sortedQuestions.length
              ? "Finish Lesson"
              : "Next Question"}
          </h4>
        </button>
      </div>
      {/* End Next Button */}
    </div>
  );
}
