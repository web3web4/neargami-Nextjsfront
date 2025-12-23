import { Fragment } from "react";
import { HeaderV2, CourseHeader, CourseLesson, CourseDetailsContent } from "@/section";
import { PageHeader } from "@/components";
import { getAllLectureForCourse } from "@/apiService";
import { generateCourseDetailsMetadata } from "@/utils";

export async function generateMetadata({ params }: { params: any }) {
  const { courseSlug } = await params;
  const data = await getAllLectureForCourse(courseSlug);

  return generateCourseDetailsMetadata(data, courseSlug);
}

export default async function CourseDetailsPage({ params }: { params: any }) {
  const { courseSlug } = await params;
  const data = await getAllLectureForCourse(courseSlug);

  return (
    <Fragment>
      <HeaderV2 />
      <PageHeader
        currentPage="Course Details"
        pageTitle=""
        isShowShareIcon={true}
      />
      <CourseHeader data={data} courseSlug={courseSlug} />
      <CourseLesson data={data.lectures} />
      <CourseDetailsContent content={data.lectures[0]?.course?.description} />
    </Fragment>
  );
}
