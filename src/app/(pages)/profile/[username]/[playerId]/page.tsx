import Header from "@/section/Header/v2/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import ProfileDetails from "@/section/Profile/ProfileDetails";
import { getProfileCourses, getUserProfileByUsername } from "@/apiService";
import { CoursesResponse, UserProfileData } from "@/interfaces/api";
import { generateProfileMetadata } from "@/utils/generateMetadata";

interface ProfilePageProps {
  params: Promise<{ username: string; playerId: string }>;
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const { username, playerId } = await params;
  const data: UserProfileData = await getUserProfileByUsername(username);

  return generateProfileMetadata(data, username, playerId);
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username, playerId } = await params;
  const data: UserProfileData = await getUserProfileByUsername(username);
  const courses: CoursesResponse[] = await getProfileCourses(playerId);

  return (
      <>
        <Header />
        <PageHeader currentPage={"Player"} pageTitle={"Player Details"} />
        <ProfileDetails playerId={playerId} data={data} courses={courses} />
      </>

  );
}
