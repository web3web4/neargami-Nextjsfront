import Header from "@/section/Header/v2/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import ProfileDetails from "@/section/Profile/ProfileDetails";
import { getUserProfile } from "@/apiService";
import { UserProfileData } from "@/interfaces/api";
import { generateProfileMetadata } from "@/utils/generateMetadata";

export async function generateMetadata() {
  const data: UserProfileData = await getUserProfile();

  return generateProfileMetadata(data, null, null);
}

export default async function ProfilePage() {
  const data:UserProfileData = await getUserProfile();

  return (
    <>
      <Header />
      <PageHeader
          currentPage={"Profile"}
          pageTitle={"Profile Details"}
      />
      <ProfileDetails playerId={null} data={data}  />
    </>

  );
}
