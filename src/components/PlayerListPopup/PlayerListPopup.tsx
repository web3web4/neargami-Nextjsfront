"use client";

import styles from "./PlayerListPopup.module.css";
import CustomPopup from "@/components/customPopup/CustomPopup";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CoursesResponse, CoursesVersionResponse, DataPopup } from "@/interfaces/api";
import userDefault from "@/assets/images/no-User.png";
import Button from "@/components/button/Button";
import { submitWhatsNewVersionCourse } from "@/apiServiceDashboard";

interface PlayerListPopupProps {
  open: boolean;
  onClose: () => void;
  title: string;
  fetchPlayers: DataPopup[] | null ;
  fetchSatusHistory?: CoursesResponse[] ;
  fetchVersionCourseHistory? : CoursesVersionResponse[] ;
  description?:string;
  courseId?: string | number;
}

const PlayerListPopup: React.FC<PlayerListPopupProps> = ({ open, onClose, title, fetchPlayers , description , fetchSatusHistory , fetchVersionCourseHistory , courseId}) => {
  const [players, setPlayers] = useState<DataPopup[] | null >([]);
  const [statusHistoryCourse , setStatusHistoryCourse] = useState<CoursesResponse[] | undefined>([]);
  const [versionCourses , setversionCourses] = useState<CoursesVersionResponse[] | undefined>([]);

  const [desc, setDescription] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [showTextArea, setShowTextArea] = useState(false);
  const [text, setText] = useState("");
const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDiv = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };


  const handleSubmit = async () => {
    try {
      const response = await submitWhatsNewVersionCourse(text , courseId)
      if (response.parent_version_id === courseId) {
        setShowTextArea(false);
      } else {
        console.error("Failed to send data");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  useEffect(() => {
    if (open) {
      setLoading(true);
      setPlayers(fetchPlayers);
      setDescription(description);
      setStatusHistoryCourse(fetchSatusHistory);
      setversionCourses(fetchVersionCourseHistory);
      setLoading(false);
    }
  }, [open, fetchPlayers , description , fetchSatusHistory , fetchVersionCourseHistory]);

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

              case !!versionCourses:
                return (
                  <div className={styles.statusHistory}>
                    <p>Number of Versions :  {versionCourses.length}</p>
                  {versionCourses.map((prop, index) => (
                    <div key={index} className={styles.versionCourses} >
                        <p> Date of Creation: {new Date(prop.created_at).toISOString().split("T")[0]}</p> 
                        <p className={styles.versionwhats} onClick={() => toggleDiv(index)}>Whats New?</p>
                        {openIndex === index && (
                          <div className={styles.detailsDiv}>
                            <p>{prop.whats_new}</p>
                          </div>
                        )}
                    </div>
                  ))}
                    {!showTextArea ? (
                      <Button
                        size="sm"
                        variant="blue"
                        onClick={() => setShowTextArea(true)} 
                      >
                      Whats New
                      </Button>
                    ) : (
                      <div>
                        <textarea
                          value={text}
                          onChange={(e) => setText(e.target.value)} 
                          rows={4}
                          cols={50}
                        />
                        <Button size="sm" variant="mint" onClick={handleSubmit}>
                          Submit
                        </Button>
                      </div>
                    )}
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
