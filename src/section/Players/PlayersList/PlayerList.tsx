"use client"
import React from "react";
import { PlayersData } from "@/interfaces/api";
import PlayerCard from "../PlayerCard/PlayerCard";
import LoadingWrapper from "@/components/loading/loadingWrapper/LoadingWrapper";
import style from "./PlayerList.module.css";
import Pagination from "@/components/Pagination/Pagination";
interface PlayerDetailsProps {
  data: PlayersData; 
  currentPage: number;
}

export default function PlayersList( {data,currentPage} : PlayerDetailsProps) {



return (
    <LoadingWrapper>
      <div className="container">
        <div className={`${style.private} row`}>
          {data.users.map((player, index) => (
            
            <div key={index} className="col-lg-6 col-md-12">
              <PlayerCard {...player} />
            </div>
          ))}
        </div>
        <Pagination currentPage={currentPage} pageCount={data.meta.pageCount} />
      </div>
    </LoadingWrapper>
  );
}
