
"use client";
import { CoursesResponse, CoursesVersionResponse } from "@/interfaces/api";
import { Button, PlayerListPopup } from "@/components";
import photoDefault from "@/assets/images/no-Course.png";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { getCourseVersion } from "@/apiServiceDashboard";
import styles from "./CourseCard.module.css";

const CourseCard = ({
  id,
  logo,
  name,
  title,
  difficulty,
  publish_status = "",
  slug,
  is_version,
  parent_version_id

}: CoursesResponse) => {
  const translate = useTranslations("TeacherDashboard");
  const transDifficulty = useTranslations("CourseDifficulty");
  const [showStartPopup, setShowStartPopup] = useState<boolean>(false);
  const [popupversions, setPopupversions] = useState<CoursesVersionResponse[]>([]);

  const handleOpenStartPopup = async () => {
    try {
      const versionHistory = await getCourseVersion(id);
      setPopupversions(versionHistory);
      setShowStartPopup(true);
    } catch (error) {
      console.error("Error fetching start players:", error);
    }
  };

  const renderButtons = () => {
    switch (publish_status.toUpperCase()) {
      case "APPROVED":
        return (
          <>
            <Button variant="mint" size="sm">
              <Link href={`/course-info/${slug}`} style={{ color: "black" }}>
                {translate("Edit")}
              </Link>
            </Button>
            <Button
              variant="white"
              size="sm"
              style={{ marginLeft: "10px" }}
              onClick={handleOpenStartPopup}
            >
              <Link href={``} style={{ color: "black" }}>
                {translate("New Version")}
              </Link>
            </Button>
          </>
        );

      case "DRAFT":
        return (
          <Button variant="mint" size="sm">
            <Link href={`/course-info/${slug}`} style={{ color: "black" }}>
              {translate("Edit")}
            </Link>
          </Button>
        );

      case "REJECTED":
        return <h4>{publish_status}</h4>;

      default:
        return null;
    }
  };

  return (
    <>
      <PlayerListPopup
        open={showStartPopup}
        onClose={() => setShowStartPopup(false)}
        title="Course Versions"
        fetchVersionCourseHistory={popupversions}
        fetchPlayers={null}
        courseId={id}
      />

      <div className={styles.courseCard}>
        <div className={styles.courseInfo}>
          <Link href={`/show-lesson/${id}/${slug}`}>
            <Image
              src={logo || photoDefault}
              width={500}
              height={500}
              alt="course logo"
            />
          </Link>
          <div className={styles.courseAuthor}>
            <h4 className="mb-10">
              <Link href={`/show-lesson/${id}/${slug}`}>{name}</Link>
            </h4>
            <div>{title}</div>
          </div>
        </div>

        <div className={styles.courseContent}>
          <div className={styles.courseHeader}>
            <div className={styles.headingTitle}>
              <h4>{transDifficulty(difficulty)}</h4>
            </div>
            {(is_version || id !== parent_version_id) && (
              <h4 className={styles.courseversion}>New Version</h4>
            )}
          </div>
        </div>

        <div className={styles.publishStatus}>{renderButtons()}</div>
      </div>
    </>
  );
};

export default CourseCard;
