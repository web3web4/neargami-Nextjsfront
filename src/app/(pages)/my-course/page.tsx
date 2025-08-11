import Header from "@/section/Header/v2/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import { getMyCourses } from "@/apiService";
import { generateMyCoursesMetadata } from "@/utils/generateMetadata";
import { MyCourses } from "@/interfaces/course";
import CoursesList from "@/section/MyCourses/CoursesList";

export const metadata = generateMyCoursesMetadata();

export default async function MyCoursesPage() {
  const courses: MyCourses[] = await getMyCourses();

  return (
      <>
        <Header />
        <PageHeader currentPage="My Courses" pageTitle="My Courses" />
        <CoursesList courses={courses}/>
      </>
  );
}
