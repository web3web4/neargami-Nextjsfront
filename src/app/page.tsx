import React, { Fragment } from "react";
import Banner from "@/components/Banner/Banner";
import Footer from "@/section/Footer/v1/Footer";
import CoursesList from "@/section/Home/Courses/CoursesList";
import { getAllCourses } from "@/apiService";
import { CoursesResponse } from "@/interfaces/api";
import Header from "@/section/Header/v1/Header";
import CoursesInProgress from "@/section/Home/CoursesInProgress/CoursesInProgress";
import { generateHomeMetadata } from "@/utils/generateMetadata";

export const metadata = generateHomeMetadata();

export default async function HomePage() {
  const courses: CoursesResponse[] = await getAllCourses();
  return (
    <Fragment>
      <Header />
      <Banner />
      <CoursesInProgress />
      <CoursesList courses={courses} />
      <Footer />
    </Fragment>
  );
}
