import { Fragment } from "react";
import Header from "@/section/Header/v2/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import ShowLesson from "@/section/ShowLesson/ShowLesson";
import { getAllLesson } from "@/apiService";
import { generateShowLessonMetadata } from "@/utils/generateMetadata";

export async function generateMetadata({params}: {params: any}) {
  const { courseId, courseSlug } = await params;
  const data = await getAllLesson(courseId);

  return generateShowLessonMetadata(data, courseId, courseSlug);
}

export default async function ShowLessonPage({ params }: { params: any }) {
  const { courseId, courseSlug } = await params;
  const data = await getAllLesson(courseId);

  return (
    <Fragment>
      <Header />
      <PageHeader currentPage="Add Course Info" pageTitle="Course Lessons" />
      <ShowLesson courseId={courseId} courseSlug={courseSlug} data={data} />
    </Fragment>
  );
}
