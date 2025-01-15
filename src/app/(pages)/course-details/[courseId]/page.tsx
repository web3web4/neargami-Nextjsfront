import { Fragment } from "react";
import Header from "@/section/Header/v2/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import CourseHeader from "@/section/CourseDetails/CourseHeader/CourseHeader";
import CourseLesson from "@/section/CourseDetails/CourseLesson/CourseLesson";
import CourseContent from "@/section/CourseDetails/CourseContent/CourseContent";
import photoDefault from "@/assets/images/no-Course.png";
import { getAllLectureForCourse } from "@/apiService";

export async function generateMetadata({ params }: { params: any }) {
  const { courseId } = await params;
  const data = await getAllLectureForCourse(courseId);

  return {
    title: data.lectures[0].course.name || "Course Name",
    description: data.lectures[0].course.description || "Course Description",
    openGraph: {
      title: data.lectures[0].course.name || "Course Name",
      description: data.lectures[0].course.description || "Course Description",
      url: `${process.env.NEXT_PUBLIC_DOMIN_NAME}/course-detials/${courseId}`,
      type: "website",
      images: [
        {
          url: data.lectures[0].course.logo || photoDefault,
          width: 600,
          height: 600,
          alt: "Course Logo",
        },
      ],
    },
  };
}

export default async function CourseDetailsPage({ params }: { params: any }) {
  const { courseId } = await params;
  const data = await getAllLectureForCourse(courseId);

  return (
    <Fragment>
      <Header />
      <PageHeader
        currentPage="Course Details"
        pageTitle=""
        isShowShareIcon={true}
        
      />
      <CourseHeader data={data} />
      <CourseLesson data={data.lectures} />
      <CourseContent content={data.lectures[0]?.course?.description} />
    </Fragment>
  );
}
