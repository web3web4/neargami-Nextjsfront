import { getAllCourses } from "@/apiService";
import { CoursesResponse } from "@/interfaces/api";
import { generateHomeMetadata } from "@/utils/generateMetadata";
import HomePageWrapper from "@/components//HomePageWrapper";

export const metadata = generateHomeMetadata();

export default async function HomePage() {
  const courses: CoursesResponse[] = await getAllCourses();

  return (
    <HomePageWrapper courses={courses} />
  );
}
