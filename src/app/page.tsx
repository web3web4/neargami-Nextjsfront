import { getAllCourses } from "@/apiService";
import { CoursesResponse } from "@/interfaces/api";
import { generateHomeMetadata } from "@/utils/generateMetadata";
import HomePageWrapper from "@/components//HomePageWrapper";
import Header from "@/section/Header/v1/Header";
import Banner from "@/components/Banner/Banner";
import CoursesList from "@/section/Home/Courses/CoursesList";
import Footer from "@/section/Footer/v1/Footer";

export const metadata = generateHomeMetadata();

export default async function HomePage() {
  const courses: CoursesResponse[] = await getAllCourses();

  return (
    <HomePageWrapper>
      <Header />
      <Banner />
      <CoursesList initCourses={courses} />
      <Footer />
    </HomePageWrapper>
  );
}
