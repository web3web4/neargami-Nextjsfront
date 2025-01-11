import React, { Fragment } from "react";
import Banner from "@/components/Banner/Banner";
import Footer from "@/section/Footer/v1/Footer";
import CoursesList from "@/section/Home/Courses/CoursesList";
import { getAllCourses } from "@/apiService";
import { CoursesResponse } from "@/interfaces/api";
import Header from "@/section/Header/v1/Header";
import CoursesInProgress from "@/section/Home/CoursesInProgress/CoursesInProgress";

export const metadata = {
  title: "NearGami | Play to learn & learn to earn",
  description:
    "Join NearGami to learn Web3, smart contracts, and Near Protocol with gamified courses. Play to learn & learn to earn!",
  openGraph: {
    title: "NearGami | Play to learn & learn to earn",
    description:
      "Discover NearGami, a platform to learn Web3 and smart contracts in a gamified way. Play to learn & learn to earn rewards.",
    url: "https://neargami.com",
    images: [
      {
        url: "https://neargami.com//assets/images/brand/Logo/With-BG/Dark/Logo-3-Size/512.png",
        width: 1200,
        height: 630,
        alt: "NearGami Logo and Tagline",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NearGami | Play to learn & learn to earn",
    description:
      "Learn Web3, smart contracts, and Near Protocol with NearGami. Gamified learning for the blockchain world!",
    images:
      "https://neargami.com/assets/images/brand/Logo/With-BG/Dark/Logo-3-Size/512.png",
  },
};

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
