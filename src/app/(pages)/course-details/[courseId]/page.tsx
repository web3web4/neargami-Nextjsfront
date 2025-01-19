import { Fragment } from "react";
import Header from "@/section/Header/v2/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import CourseHeader from "@/section/CourseDetails/CourseHeader/CourseHeader";
import CourseLesson from "@/section/CourseDetails/CourseLesson/CourseLesson";
import CourseContent from "@/section/CourseDetails/CourseContent/CourseContent";
import { fetchEndPlayers, fetchStartPlayers, getAllLectureForCourse } from "@/apiService";
import { generateCourseDetailsMetadata } from "@/utils/generateMetadata";

export async function generateMetadata({ params }: { params: any }) {
  const { courseId } = params;
  const data = await getAllLectureForCourse(courseId);

  return generateCourseDetailsMetadata(data, courseId);
}

export default async function CourseDetailsPage({ params }: { params: any }) {
  const { courseId } = await params;
  const data = await getAllLectureForCourse(courseId);
  const popupEndUser = await fetchEndPlayers(courseId);
  const popupStartUser = await fetchStartPlayers(courseId);


  return (
    <Fragment>
      <Header />
      <PageHeader
        currentPage="Course Details"
        pageTitle=""
        isShowShareIcon={true}
        
      />
      <CourseHeader data={data} popupEndUser={popupEndUser} popupStartUser={popupStartUser}/>
      <CourseLesson data={data.lectures} />
      <CourseContent content={data.lectures[0]?.course?.description} />
    </Fragment>
  );
}
