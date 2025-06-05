"use client";

import Banner from "@/components/Banner/Banner";
import Footer from "@/section/Footer/v1/Footer";
import CoursesList from "@/section/Home/Courses/CoursesList";
import Header from "@/section/Header/v1/Header";
import CoursesInProgress from "@/section/Home/CoursesInProgress/CoursesInProgress";
import { CoursesResponse } from "@/interfaces/api";
import ClientSpeedLinesProvider from "@/components/SpeedLines/ClientSpeedLines";

interface HomePageWrapperProps {
  courses: CoursesResponse[];
}

const HomePageWrapper: React.FC<HomePageWrapperProps> = ({ courses }) => {
  return (
    <ClientSpeedLinesProvider>
      <>
        <Header />
        <Banner />
        <CoursesInProgress />
        <CoursesList initCourses={courses} />
        <Footer />
      </>
    </ClientSpeedLinesProvider>
  );
};

export default HomePageWrapper;
