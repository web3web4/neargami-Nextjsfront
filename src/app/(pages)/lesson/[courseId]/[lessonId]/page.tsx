import { Fragment } from "react";
import Header from "@/section/Header/v2/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import Lesson from "@/section/Lesson/Lesson";
import { getLessonById } from "@/apiService";
import { LessonResponse } from "@/interfaces/api";
import { generateLessonMetadata } from "@/utils/generateMetadata";

export async function generateMetadata({ params }: { params: any }) {
  const { courseId, lessonId } = await params;
  const isEdit = Number(lessonId);
  let data: LessonResponse | null = null;
  if (isEdit) data = await getLessonById(courseId, lessonId);

  return generateLessonMetadata(data, courseId, lessonId);
}

export default async function LessonPage({ params }: { params: any }) {
  const { courseId, lessonId } = await params;
  const isEdit = Number(lessonId);
  let data: LessonResponse | null = null;
  if (isEdit) data = await getLessonById(courseId, lessonId);

  return (
    <Fragment>
      <Header />
      <PageHeader
        currentPage="Add Course Info"
        pageTitle={!isEdit ? "Add Lesson" : "Edit Lesson"}
      />
      <Lesson courseId={courseId} lessonId={lessonId} data={data} />
    </Fragment>
  );
}
