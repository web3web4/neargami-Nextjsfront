import { Fragment } from "react";
import Header from "@/section/Header/v2/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import LeaderBoard from "@/section/LeaderBoard/LeaderBoard";
import { generateLeaderboardMetadata } from "@/utils/generateMetadata";

export const metadata = generateLeaderboardMetadata();

export default function LeaderBoardPage() {
  return (
    <Fragment>
        <Header />
        <PageHeader currentPage="Leader Board" pageTitle={"Leader Board"} />
        <LeaderBoard />
    </Fragment>
  );
}
