import { Fragment } from "react";
import Header from "@/section/Header/v2/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import PlayersList from "@/section/Players/PlayersList/PlayerList";
import { UserProfileData } from "@/interfaces/api";
import { getAllPlayers } from "@/apiService";
import { generatePlayersMetadata } from "@/utils/generateMetadata";

export const metadata = generatePlayersMetadata();
interface Props {
  searchParams: Promise < { [key: string]: string | string[] } > ;
}

export default async function PlayersPage({ searchParams }: Props) {
  const page = parseInt((await searchParams).page  as string) || 1; 

  const data:UserProfileData[] = await getAllPlayers(page);


  return (
    <Fragment>
        <Header />
        <PageHeader currentPage="Players" pageTitle="NearGami Players" />
        <PlayersList data={data} currentPage={page} />
    </Fragment>
  );
}
