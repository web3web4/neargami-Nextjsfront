import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
    createStartUserLectureInCourse,
    updateFinishLectureInCourse,
    checkAnswer,
    createStartInCourse,
  } from "@/apiService";
import { CheckAnswerResponse, QAResponse } from "@/interfaces/api";
import { useTranslations } from "next-intl";

export const useQuizContent = (courseId: string, lectureId: string, data: QAResponse[]) => {
  const router = useRouter();
    const [isCorrect, setIsCorrect] = useState<boolean| null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [answers, setAnswers] = useState<CheckAnswerResponse>();
    const [currentQuestionSequence, setCurrentQuestionSequence] = useState<number>(1);
    const translate = useTranslations("messages");
    
  
    // Create User Course And Lecture
    useEffect(() => {
      const createStartCourse = async () => {
        try {
          await createStartInCourse(courseId);
        } catch (error) {
          console.error("Error in createStartCourse:", error);
        }
      };
  
      const createStartUserLecture = async () => {
        try {
          await createStartUserLectureInCourse(courseId, lectureId);
        } catch (error) {
          console.error("Error in createStartUserLecture:", error);
        }
      };
  
      const initiateCourseAndLecture = async () => {
          await createStartCourse();
          await createStartUserLecture();
      };
  
      initiateCourseAndLecture();
    }, [courseId, lectureId]);
  
    // Sort Qustion According By sequence
    const sortedQuestions = data.sort((a, b) => a.sequence - b.sequence);
  
    // Get Qustion According By sequence
    const currentQuestion: any = sortedQuestions.find(
      (question) => question.sequence === currentQuestionSequence
    );
  
    // Handle Answer Change
    const handleAnswerChange = (id: number) => {
      setSelectedAnswers((prevAnswers) => {
        if (prevAnswers.includes(id)) {
          return prevAnswers.filter((answerId) => answerId !== id);
        } else {
          return [...prevAnswers, id];
        }
      });
    };
  
    const handleCheckAnswers = async () => {
      // Get Correct Answer For Current Qustion
      if (selectedAnswers.length === 0) {
        Swal.fire({
          icon: "warning",
          title: translate("Warning"),
          text: translate("Please select at least one correct answer before submitting"),
        });
        return;
      }

      const qustion = data.filter(
        (qu) => qu.sequence === currentQuestionSequence
      );

      const qustionId = (qustion[0].id).toString();
      try {
        const answers = await checkAnswer(
          courseId,
          lectureId,
          qustionId,
          selectedAnswers
        );
        if (!answers) {
          Swal.fire({
            icon: "error",
            title: translate("Error"),
            text: translate("There Was An Error When Check Answers"),
          });
        }
        setAnswers(answers);
        const correctAnswers = answers.correctAnswers
          .filter((answer) => answer.is_correct)
          .map((answer) => answer.id);
  
        const isAllCorrect =
          selectedAnswers.length === correctAnswers.length &&
          selectedAnswers.every((id) => correctAnswers.includes(id));
  
        setIsCorrect(isAllCorrect);
        const audioFile = isAllCorrect ? "/Correct.mp3" : "/Wrong.mp3";
        const audio = new Audio(audioFile);
        audio.play();
      } catch (error) {
        console.log(`Error on check answers ${error}`);
      }
    };
  
    const handleNextQuestion = async () => {
      if (currentQuestionSequence === sortedQuestions.length) {
        await updateFinishLectureInCourse(courseId, lectureId);
        Swal.fire({
          icon: "success",
          title: translate("Congratulations!"),
          text: translate("You have successfully completed this lesson Proceed to the next lesson to continue your progress"),
        });
          router.push(`/course-details/${data[0].lecture.course.slug}`);
      }

      setSelectedAnswers([]);
      setIsCorrect(null);
  
      // Move To Next Qustion
      setCurrentQuestionSequence((prevNumber) =>
        prevNumber < sortedQuestions.length ? prevNumber + 1 : prevNumber
      );
    };
    
    return{
        currentQuestionSequence,
        sortedQuestions,
        isCorrect,
        answers,
        currentQuestion,
        selectedAnswers,
        handleAnswerChange,
        handleCheckAnswers,
        handleNextQuestion
    }
}