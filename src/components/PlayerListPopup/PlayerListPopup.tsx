"use client";

import styles from "./PlayerListPopup.module.css";
import CustomPopup from "@/components/customPopup/CustomPopup";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CoursesResponse, DataPopup } from "@/interfaces/api";
import userDefault from "@/assets/images/no-User.png";

interface PlayerListPopupProps {
  open: boolean;
  onClose: () => void;
  title: string;
  fetchPlayers: DataPopup[] | null ;
  fetchSatusHistory?: CoursesResponse[] ;
  description?:string;
}

const PlayerListPopup: React.FC<PlayerListPopupProps> = ({ open, onClose, title, fetchPlayers , description , fetchSatusHistory}) => {
  const [players, setPlayers] = useState<DataPopup[] | null >([]);
  const [statusHistoryCourse , setStatusHistoryCourse] = useState<CoursesResponse[] | undefined>([]);
  const [desc, setDescription] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (open) {
      setLoading(true);
      setPlayers(fetchPlayers);
      setDescription(description);
      setStatusHistoryCourse(fetchSatusHistory);
      setLoading(false);
    }
  }, [open, fetchPlayers , description , fetchSatusHistory]);

  return (
    <CustomPopup open={open} closed={onClose}>
      <div className={styles.popupContainer}>
        <h3>{title}</h3>
        {(() => {
          switch (true) {
            case !!desc:
              return <p className={styles.description}>{desc}</p>;
  
            case loading:
              return <p>Loading...</p>;
  
            case !!statusHistoryCourse && statusHistoryCourse.length > 0:
              return (
                <div className={styles.statusHistory}>
                  {statusHistoryCourse.map((log, index) => (
                    <div key={index} className={styles.statusItem}>
                      <p>{log.changeStatusReson || "No reason provided"}</p>
                    </div>
                  ))}
                </div>
              );
  
            case !!players && players.length > 0:
              return (
                <div className={styles.playerList}>
                  {players.map((player, index) => (
                    <Link href={`/profile/${player.user.username}`} key={index}>
                      <div className={styles.playerItem}>
                        <Image
                          src={player.user.image || userDefault}
                          alt={`${player.firstname} ${player.lastname}`}
                          width={50}
                          height={50}
                          className={styles.playerImage}
                        />
                        <div className={styles.playerDetails}>
                          <p>{player.user.firstname}</p> <p>{player.user.lastname}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              );
  
            default:
              return <p>No Data found</p>;
          }
        })()}
      </div>
    </CustomPopup>
  );
  
};

export default PlayerListPopup;
