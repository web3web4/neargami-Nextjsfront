import { Fragment } from "react";
import Header from "@/section/Header/v2/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import ProfileDetails from "@/section/Profile/ProfileDetails";
import { getProfileCourses, getUserProfile } from "@/apiService";
import { CoursesResponse, UserProfileData } from "@/interfaces/api";

interface ProfilePageProps {
  params: Promise<{ playerId: string }>;
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const { playerId } = await params;
  const data: UserProfileData = await getUserProfile(playerId);

  return generateProfileMetadata(data, playerId);
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { playerId } = await params;
  const data: UserProfileData = await getUserProfile(playerId);
  const courses : CoursesResponse[] = await getProfileCourses(playerId);

  return (
    <Fragment>
        <Header />
        <PageHeader currentPage={"Player"} pageTitle={"Player Details"} />
        <ProfileDetails
          playerId={playerId}
          data={data} 
          courses={courses}
        />
    </Fragment>
  );
}
