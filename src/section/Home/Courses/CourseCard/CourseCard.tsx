import TotalRating from "@/components/totalRating/TotalRating";
import ngcIcons from "@/assets/images/brand/Logo/Without-BG/Logo-3-Size/32.png";
import styles from "./CourseCard.module.css";
import studentIcon from "@/assets/images/icons/student.svg";
import viewsIcon from "@/assets/images/icons/view.svg";
import photoDefault from "@/assets/images/no-Course.png";
import userDefault from "@/assets/images/no-User.png";
import Link from "next/link";
import Image from "next/image";
import CardHover from "@/components/cardHover/CardHover";
import { useState } from "react";
import PlayerListPopup from "@/components/PlayerListPopup/PlayerListPopup";
import { useTranslations } from "next-intl";
import { fetchEndPlayers, fetchStartPlayers } from "@/apiService";
import { CoursesResponse, DataPopup } from "@/interfaces/api";
interface CourseCardProps {
  props: CoursesResponse;
}

const CourseCard = ({
  props,
}: CourseCardProps) => {
  const [showStartPopup, setShowStartPopup] = useState<boolean>(false);
  const [showEndPopup, setShowEndPopup] = useState<boolean>(false);
  const transDifficulty = useTranslations("CourseDifficulty");
  const [popupEndUser, setPopupEndUser] = useState<DataPopup[]>([]);
  const [popupStartUser, setPopupStartUser] = useState<DataPopup[]>([]);
  

  const handleOpenStartPopup = async () => {
    try {
      const startUsers = await fetchStartPlayers(props.slug);
      setPopupStartUser(startUsers);
      setShowStartPopup(true);
    } catch (error) {
      console.error("Error fetching start players:", error);
    }
  };

  const handleOpenEndPopup = async () => {
    try {
      const endUsers = await fetchEndPlayers(props.slug);
      setPopupEndUser(endUsers);
      setShowEndPopup(true);
    } catch (error) {
      console.error("Error fetching end players:", error);
    }
  };

  return (
    <>
      <PlayerListPopup
          open={showStartPopup}
          onClose={() => setShowStartPopup(false)}
          title="Students Attending the course"
          fetchPlayers={popupStartUser}
        />

        <PlayerListPopup
          open={showEndPopup}
          onClose={() => setShowEndPopup(false)}
          title="Students Who Completed the Course"
          fetchPlayers={popupEndUser}
        />
      <div className={styles.courseCard}>
        <Link prefetch={true} href={`/course-details/${props.slug}`}>
          <div className={styles.courseInfo}>
            <div>
              <Image src={ngcIcons} width={23} alt="" /> {props.total_score} NGC
            </div>
            <Image
              src={props.logo || photoDefault}
              width={500}
              height={500}
              alt={`${props.name} logo`}
              loading="lazy"
            />
            <div className={styles.courseAuother}>
              <h1 className={styles.courseName}>{props.name}</h1>
              <div className={styles.tagContent}>
                <div className={styles.textContent}>
                  {props.tag ? `#${props.tag}` : null}
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className={styles.courseContent}>
          <div className={styles.courseHeader}>
            <div className={styles.headingTitle}>
              <h2>{transDifficulty(props.difficulty)}</h2>
              <div>
                <TotalRating
                  courseId={props.id!}
                  starsRatingStyle={styles.starsRating}
                  totalRatingStyle={styles.totalRating}
                />
              </div>
            </div>
            <div className={styles.userLogo}>
              <Link href={`/profile/${props.teacher!.username}`}>
                <Image
                  src={props.teacher!.image || userDefault}
                  width={70}
                  height={70}
                  alt="teacher image"
                  quality={75}
                  loading="lazy"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.studentCount}>
          <div
            onClick={handleOpenStartPopup}
            style={{ cursor: "pointer" }}
          >
            <Image src={viewsIcon} height={25} width={25} alt="" />
            {props.counts?._count?.start_time || 0}
          </div>
          <div
            onClick={handleOpenEndPopup}
            style={{ cursor: "pointer" }}
          >
            <Image src={studentIcon} height={25} width={25} alt="" />
            {props.counts?._count?.end_time || 0}
          </div>
        </div>
        <CardHover styles={styles} />
      </div>
    </>
  );
};

export default CourseCard;
