import { Fragment } from "react";
import Header from "@/section/Header/v2/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import CourseHeader from "@/section/CourseDetails/CourseHeader/CourseHeader";
import CourseLesson from "@/section/CourseDetails/CourseLesson/CourseLesson";
import CourseContent from "@/section/CourseDetails/CourseContent/CourseContent";
import { getAllLectureForCourse } from "@/apiService";
import { generateCourseDetailsMetadata } from "@/utils/generateMetadata";

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
      <Header />
      <PageHeader
        currentPage="Course Details"
        pageTitle=""
        isShowShareIcon={true}
      />
      <CourseHeader data={data} courseSlug={courseSlug} />
      <CourseLesson data={data.lectures} />
      <CourseContent content={data.lectures[0]?.course?.description} />
    </Fragment>
  );
}
