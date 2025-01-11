import { Fragment } from "react";
import Header from "@/section/Header/v2/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import ProfileDetails from "@/section/Profile/ProfileDetails";
import { getUserProfile } from "@/apiService";
import { UserProfileData } from "@/interfaces/api";

interface ProfilePageProps {
  params: Promise<{ playerId: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { playerId } = await params;
  const data: UserProfileData = await getUserProfile(playerId);

  return (
    <Fragment>
        <Header />
        <PageHeader currentPage={"Player"} pageTitle={"Player Details"} />
        <ProfileDetails
          playerId={playerId}
          data={data} /*balance={balanceOfUser}*/
        />
    </Fragment>
  );
}
