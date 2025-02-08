import Header from "@/section/Header/v2/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import EditProfileDetails from "@/section/Profile/EditProfile/EditProfileDetails";
import { UserProfileResponse } from "@/interfaces/api";
import { getUserProfile } from "@/apiService";

export default async function EditProfilePage() {
    const data: UserProfileResponse = await getUserProfile(null);

  
  return (
      <>
        <Header />
        <PageHeader currentPage="Profile" pageTitle="Profile Details"/>
        <EditProfileDetails data={data} />
      </>
  );
}