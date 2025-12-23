import { HeaderV2, ProfileDetails } from "@/section";
import { PageHeader } from "@/components";
import {
  getProfileCoursesByUsername,
  getUserProfileByUsername,
} from "@/apiService";
import { CoursesResponse, UserProfileData } from "@/interfaces/api";
import { generateProfileMetadata } from "@/utils/generateMetadata";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const { username } = await params;
  const data: UserProfileData = await getUserProfileByUsername(username);

  return generateProfileMetadata(data, username);
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const data: UserProfileData = await getUserProfileByUsername(username);
  const courses: CoursesResponse[] = await getProfileCoursesByUsername(username);

  return (
    <>
      <HeaderV2 />
      <PageHeader currentPage={"Player"} pageTitle={"Player Details"} />
      <ProfileDetails username={username} data={data} courses={courses} />
    </>
  );
}
