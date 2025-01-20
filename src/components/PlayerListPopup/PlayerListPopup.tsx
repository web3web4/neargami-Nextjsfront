"use client";

import styles from "./PlayerListPopup.module.css";
import CustomPopup from "@/components/customPopup/CustomPopup";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DataPopup } from "@/interfaces/api";
import userDefault from "@/assets/images/no-User.png";

interface PlayerListPopupProps {
  open: boolean;
  onClose: () => void;
  title: string;
  fetchPlayers: DataPopup[] | null; 
  description?:string;
}

const PlayerListPopup: React.FC<PlayerListPopupProps> = ({ open, onClose, title, fetchPlayers , description}) => {
  const [players, setPlayers] = useState<DataPopup[] | null>([]);
  const [desc, setDescription] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (open) {
      setLoading(true);
      setPlayers(fetchPlayers);
      setDescription(description)
      setLoading(false);
    }
  }, [open, fetchPlayers , description]);

  return (
    <CustomPopup open={open} closed={onClose}>
      <div className={styles.popupContainer}>
        <h3>{title}</h3>
        {desc ? (
          <p className={styles.description}>{desc}</p>
        ) : (
          loading ? (
            <p>Loading...</p>
          ) : players && players.length > 0 ? (
            <div className={styles.playerList}>
              {players.map((player, index) => (
                <Link href={`/profile/${player.id}`} key={index}>
                  <div className={styles.playerItem}>
                    <Image
                      src={player.image || userDefault} 
                      alt={`${player.firstname} ${player.lastname}`}
                      width={50}
                      height={50}
                      className={styles.playerImage}
                    />
                    <div className={styles.playerDetails}>
                      <p>{player.firstname}</p> <p>{player.lastname}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>No Student found</p>
          )
        )}
      </div>
    </CustomPopup>
  );
};

export default PlayerListPopup;
