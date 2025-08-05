import Header from "@/section/Header/v2/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import ProfileDetails from "@/section/Profile/ProfileDetails/ProfileDetails";
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
      <Header />
      <PageHeader currentPage={"Profile"} pageTitle={"Profile Details"} />
      <ProfileDetails username={null} data={data} myCourses={inProgressCourses}/>
    </>
  );
}
