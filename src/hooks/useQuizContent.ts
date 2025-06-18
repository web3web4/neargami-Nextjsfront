import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createStartUserLectureInCourse, updateFinishLectureInCourse, checkAnswer, createStartInCourse, getCurrentNgcs } from "@/apiService";
import { CheckAnswerResponse, QAResponse } from "@/interfaces/api";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";

export const useQuizContent = ( courseId: string, lectureId: string, data: QAResponse[]) => {
  const router = useRouter();
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [answers, setAnswers] = useState<CheckAnswerResponse>();
  const [currentQuestionSequence, setCurrentQuestionSequence] = useState<number>(1);
  const [currNGC, setCurrNGC] = useState<number>(0);
  const translate = useTranslations("messages");

  // Create User Course And Lecture
  useEffect(() => {
    const createStartCourse = async () => {
      try {
        const response = await createStartInCourse(courseId);

        if ("error" in response) {
          throw response;
        }
      } catch (error: any) {
        if (error.status !== 409) {
          console.error("Error in createStartCourse:", error);
        }
      }
    };

    const createStartUserLecture = async () => {
      try {
        const response = await createStartUserLectureInCourse(courseId, lectureId);

        if ("error" in response) {
          throw response;
        }
      } catch (error: any) {
        if (error.status !== 409) {
          console.error("Error in createStartUserLecture:", error);
        }
      }
    };

    const initiateCourseAndLecture = async () => {
      await createStartCourse();
      await createStartUserLecture();
    };

    initiateCourseAndLecture();
  }, [courseId, lectureId]);

  useEffect(() => {
    const fetchCurrentNgcs = async () => {
      try {
        const response = await getCurrentNgcs();
        setCurrNGC(parseInt(response!.toString()));
      } catch (error: any) {
        console.error("Error in getCurrentNgcs:", error);
      }
    };

    fetchCurrentNgcs();
  },[]);

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
        text: translate(
          "Please select at least one correct answer before submitting"
        ),
      });
      return;
    }

    const qustion = data.filter(
      (qu) => qu.sequence === currentQuestionSequence
    );

    const qustionId = qustion[0].id.toString();
    try {
      const answers = await checkAnswer(
        courseId,
        lectureId,
        qustionId,
        selectedAnswers
      );

      if ("error" in answers) {
        throw answers;
      }

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
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: translate("Error"),
        text: `Error on check answers, ${error.message}`,
      });
    }
  };

  const handleNextQuestion = async () => {
    if (currentQuestionSequence === sortedQuestions.length) {
      await updateFinishLectureInCourse(courseId, lectureId);
      Swal.fire({
        icon: "success",
        title: translate("Congratulations!"),
        text: translate(
          "You have successfully completed this lesson Proceed to the next lesson to continue your progress"
        ),
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

  return {
    currentQuestionSequence,
    sortedQuestions,
    isCorrect,
    answers,
    currNGC,
    currentQuestion,
    selectedAnswers,
    handleAnswerChange,
    handleCheckAnswers,
    handleNextQuestion,
  };
};
