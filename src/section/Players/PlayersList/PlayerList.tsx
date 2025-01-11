"use client"
import React from "react";
import { UserProfileData } from "@/interfaces/api";
import PlayerCard from "../PlayerCard/PlayerCard";
import LoadingWrapper from "@/components/loading/loadingWrapper/LoadingWrapper";
import style from "./PlayerList.module.css";
interface PlayerDetailsProps {
  data: UserProfileData[]; 
}

export default function PlayersList( {data} : PlayerDetailsProps) {

  return (
    <LoadingWrapper>
      <div className="container">
        <div className={`${style.private} row`}>
          {data.map((player, index) => (
            
            <div key={index} className="col-lg-6 col-md-12">
              <PlayerCard {...player} />
            </div>
          ))}
        </div>
      </div>
    </LoadingWrapper>
  );
}
