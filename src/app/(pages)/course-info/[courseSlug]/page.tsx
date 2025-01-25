import PageHeader from "@/components/pageHeader/PageHeader";
import CourseInfo from "@/section/Course-Info/CourseInfo";
import Header from "@/section/Header/v2/Header";
import { Fragment } from "react";
import { getCourseBySlug } from "@/apiService";
import { CoursesResponse } from "@/interfaces/api";
import { generateCourseInfoMetadata } from "@/utils/generateMetadata";

export async function generateMetadata({ params }: { params: any }) {
  const { courseSlug } = await params;
  const isEdit = courseSlug;
  let data: CoursesResponse | null = null;
  if (isEdit) data = await getCourseBySlug(courseSlug);
  return generateCourseInfoMetadata(data, courseSlug);
}

export default async function CourseInfoPage({ params }: { params: any }) {
  const { courseId } = await params;
  const isEdit = Number(courseId);
  let data: CoursesResponse | null = null;
  if (isEdit) data = await getCourseBySlug(courseId);

  return (
    <Fragment>
      <Header />
      <PageHeader
        currentPage={`${isEdit ? "Edit" : "Add"} Course Info`}
        pageTitle="Add Course Info"
      />
      <CourseInfo courseId={courseId} data={data} />
    </Fragment>
  );
}
