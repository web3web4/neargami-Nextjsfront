import { getAllQuestionsForLecture } from "@/apiService";
import { QAResponse } from "@/interfaces/api";
import QuizContent from "@/section/Quiz/QuizContent/QuizContent";

export default async function QuizPage({ params }: { params: any }) {
  const { courseId, lectureId } = await params;
  const data: QAResponse[] = await getAllQuestionsForLecture(courseId, lectureId);
  
  return <QuizContent courseId={courseId} lectureId={lectureId} data={data} />;
}
