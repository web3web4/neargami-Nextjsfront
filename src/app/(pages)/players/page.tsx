import { Fragment } from "react";
import Header from "@/section/Header/v2/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import PlayersList from "@/section/Players/PlayersList/PlayerList";
import { UserProfileData } from "@/interfaces/api";
import { getAllPlayers } from "@/apiService";

export default async function PlayersPage() {
  const data:UserProfileData[] = await getAllPlayers();
  console.log("rere",data);

  return (
    <Fragment>
        <Header />
        <PageHeader currentPage="Players" pageTitle="NearGami Players" />
        <PlayersList data={data} />
    </Fragment>
  );
}
