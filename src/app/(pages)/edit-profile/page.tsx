import { HeaderV2, EditProfileDetails } from "@/section";
import { PageHeader } from "@/components";
import { UserProfileResponse } from "@/interfaces";
import { getUserProfile } from "@/apiService";

export default async function EditProfilePage() {
  const data: UserProfileResponse = await getUserProfile(null);


  return (
    <>
      <HeaderV2 />
      <PageHeader currentPage="Profile" pageTitle="Profile Details" />
      <EditProfileDetails data={data} />
    </>
  );
}