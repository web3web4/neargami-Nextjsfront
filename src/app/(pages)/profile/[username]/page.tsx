import Header from "@/section/Header/v2/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import ProfileDetails from "@/section/Profile/ProfileDetails";
import { getProfileCourses, getUserProfileByUsername } from "@/apiService";
import { CoursesResponse, UserProfileData } from "@/interfaces/api";
import { generateProfileMetadata } from "@/utils/generateMetadata";

interface ProfilePageProps {
  params: Promise<{ username: string | null }>;
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const { username } = await params;
  const data: UserProfileData = await getUserProfileByUsername(username);

  return generateProfileMetadata(data, username);
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const data: UserProfileData = await getUserProfileByUsername(username);
  const courses: CoursesResponse[] = await getProfileCourses("37676d15-2403-4b21-b52f-f5f37b12cd96");

  return (
    <>
      <Header />
      <PageHeader currentPage={"Player"} pageTitle={"Player Details"} />
      <ProfileDetails username={username} data={data} courses={courses} />
    </>
  );
}
