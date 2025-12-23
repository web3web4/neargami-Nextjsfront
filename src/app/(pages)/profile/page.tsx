import { HeaderV2, ProfileDetails } from "@/section";
import { PageHeader } from "@/components";
import { getInProgressCourses, getUserProfile } from "@/apiService";
import { UserProfileData } from "@/interfaces/api";
import { generateProfileMetadata } from "@/utils/generateMetadata";
import { MyCourses } from "@/interfaces/course";

export async function generateMetadata() {
  const data: UserProfileData = await getUserProfile();

  return generateProfileMetadata(data, null);
}

export default async function ProfilePage() {
  const data: UserProfileData = await getUserProfile();
  const inProgressCourses: MyCourses[] = await getInProgressCourses();

  return (
    <>
      <HeaderV2 />
      <PageHeader currentPage={"Profile"} pageTitle={"Profile Details"} />
      <ProfileDetails username={null} data={data} myCourses={inProgressCourses} />
    </>
  );
}
