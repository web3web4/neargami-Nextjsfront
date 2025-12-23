import { getAllCourses } from "@/apiService";
import { CoursesResponse } from "@/interfaces";
import { generateHomeMetadata } from "@/utils";
import { HomePageWrapper, Banner } from "@/components";
import { HeaderV1, HomeCoursesListSection, FooterSectionV1 } from "@/section";


export const metadata = generateHomeMetadata();

export default async function HomePage() {
  const courses: CoursesResponse[] = await getAllCourses();

  return (
    <HomePageWrapper>
      <HeaderV1 />
      <Banner />
      <HomeCoursesListSection initCourses={courses} />
      <FooterSectionV1 />
    </HomePageWrapper>
  );
}
