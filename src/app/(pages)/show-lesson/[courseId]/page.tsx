import { Fragment } from "react";
import Header from "@/section/Header/v2/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import ShowLesson from "@/section/ShowLesson/ShowLesson";
import { getAllLesson } from "@/apiService";

export default async function ShowLessonPage({ params }: { params: any }) {
  const { courseId } = await params;
  const data = await getAllLesson(courseId);

  return (
    <Fragment>
      <Header />
      <PageHeader currentPage="Add Course Info" pageTitle="Course Lesson" />
      <ShowLesson courseId={courseId} data={data} />
    </Fragment>
  );
}
