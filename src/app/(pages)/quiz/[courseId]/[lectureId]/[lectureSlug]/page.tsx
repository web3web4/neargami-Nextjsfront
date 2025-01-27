import { getAllQuestionsForLectureBySlug } from "@/apiService";
import { QAResponse } from "@/interfaces/api";
import QuizContent from "@/section/Quiz/QuizContent/QuizContent";
import { generateQuizMetadata } from "@/utils/generateMetadata";

export async function generateMetadata({ params }: { params: any }) {
  const { lectureSlug, courseId, lectureId } = await params;
  const data: QAResponse[] = await getAllQuestionsForLectureBySlug(lectureSlug);

  return generateQuizMetadata(data, courseId, lectureId, lectureSlug);
}

export default async function QuizPage({ params }: { params: any }) {
  const { lectureSlug, courseId, lectureId } = await params;
  const data: QAResponse[] = await getAllQuestionsForLectureBySlug(lectureSlug);

  return <QuizContent courseId={courseId} lectureId={lectureId} data={data} />;
}
