import { getAllQuestionsForLecture } from "@/apiService";
import { QAResponse } from "@/interfaces/api";
import QuizContent from "@/section/Quiz/QuizContent/QuizContent";
import { generateQuizMetadata } from "@/utils/generateMetadata";

export async function generateMetadata({params}: {params: any}) {
  const { courseId, lectureId } = await params;
  const data: QAResponse[] = await getAllQuestionsForLecture(courseId, lectureId);

  return generateQuizMetadata(data, courseId, lectureId);
}

export default async function QuizPage({ params }: { params: any }) {
  const { courseId, lectureId } = await params;
  const data: QAResponse[] = await getAllQuestionsForLecture(courseId, lectureId);
  
  return <QuizContent courseId={courseId} lectureId={lectureId} data={data} />;
}
