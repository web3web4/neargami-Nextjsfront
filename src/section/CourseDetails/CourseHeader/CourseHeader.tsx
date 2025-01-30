"use client"; // need refactor
import styles from "./CourseHeader.module.css";
import ProgressBar from "@/components/progressBar/v1/ProgressBar";
import studentIcon from "@/assets/images/icons/student.svg";
import viewsIcon from "@/assets/images/icons/view.svg";
import photoDefault from "@/assets/images/no-Course.png";
import userDefault from "@/assets/images/no-User.png";
import { Fragment, useEffect, useState } from "react";
import TotalRating from "@/components/totalRating/TotalRating";
import CustomPopup from "@/components/customPopup/CustomPopup";
import Rating from "@/components/rating/Rating";
import Button from "@/components/button/Button";
import Image from "next/image";
import Link from "next/link";
import { DataPopup, LessonResponse } from "@/interfaces/api";
import PlayerListPopup from "@/components/PlayerListPopup/PlayerListPopup";
import { useAuth } from "@/context/authContext";
import { useTranslations } from "next-intl";

interface HeaderCourses {
  data: LessonResponse;
  popupEndUser: DataPopup[];
  popupStartUser: DataPopup[];
}

const CourseHeader = ({
  data,
  popupEndUser,
  popupStartUser,
}: HeaderCourses) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [isNotStartCourse, setIsNotStartCourse] = useState<boolean>(true);
  const [showStartPopup, setShowStartPopup] = useState<boolean>(false);
  const [showEndPopup, setShowEndPopup] = useState<boolean>(false);
  const translate = useTranslations('CourseDetails');
  const { jwtToken } = useAuth();

  useEffect(() => {
    if (data && data?.lectures?.length > 0) {
      if (data?.lectures[0]?.userLecture) {
        const isCourseNotStarted = data?.lectures?.every(
          (item) =>
            item?.userLecture[0]?.start_at === null ||
            item?.userLecture[0]?.start_at === undefined ||
            item?.userLecture[0] === undefined
        );
        setIsNotStartCourse(isCourseNotStarted);
      }
    }
  }, [data]);

  const handleRatingClick = () => {
    setShowPopup(true);
  };

  return (
    <Fragment>
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

      <CustomPopup open={showPopup} closed={setShowPopup}>
        <Rating
          courseId={data.lectures[0]?.course ? data.lectures[0].course.id : 0}
          closed={setShowPopup}
        />
      </CustomPopup>
      <div className={`${styles.courseHeaderStyleWrapper} container`}>
        <div className={styles.CourseHeaderContainer}>
          <div>
            <Image
              src={data.lectures[0]?.course?.logo || photoDefault}
              className={styles.courseLogo}
              width={200}
              height={200}
              alt="course logo"
            />
          </div>
          <div className={styles.userLogo}>
            <Link href={`/profile/${data.lectures[0]?.course?.teacher.id}`}>
              <Image
                src={data.lectures[0]?.course?.teacher.image || userDefault}
                width={70}
                height={70}
                alt="user logo"
              />
            </Link>
          </div>
          <div className={styles.totalRatingContent}>
            <TotalRating
              starsRatingStyle={styles.starsRating}
              countRatingStyle={styles.countRating}
              courseId={
                data.lectures[0]?.course ? data.lectures[0].course.id : 0
              }
            />
            {!isNotStartCourse && jwtToken && (
              <Button size="sm" variant="mint" onClick={handleRatingClick}>
                {translate("Rating")}
              </Button>
            )}
          </div>
          <h2 className={styles.courseName}>
            {data.lectures[0]?.course?.name}
          </h2>
          <div className={styles.courseTitle}>
            {data.lectures[0]?.course?.title}
          </div>
          <div className={styles.footerCourse}>
            {jwtToken && (
              <>
                <div className={styles.courseText}>
                  <h5>
                  {translate("Course Progress")} {data?.completedLessons}/
                    {data?.lectures?.length}
                  </h5>
                </div>
                <ProgressBar
                  progress={`
                ${(data?.completedLessons * 100) / data?.lectures?.length}%`}
                />
              </>
            )}
            <div className={styles.courseText}>
              <h5>{translate("Total Prize")} {data?.totalCoursePrize} NGC</h5>
              <div className={styles.studentCount}>
                <div
                  onClick={() => setShowStartPopup(true)}
                  style={{ cursor: "pointer" }}
                >
                  <Image src={viewsIcon} height={25} width={25} alt="" />
                  {data?.counts?.[0]?._count?.start_time || 0}
                </div>
                <div
                  onClick={() => setShowEndPopup(true)}
                  style={{ cursor: "pointer" }}
                >
                  <Image src={studentIcon} height={25} width={25} alt="" />
                  {data?.counts?.[0]?._count?.end_time || 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CourseHeader;
