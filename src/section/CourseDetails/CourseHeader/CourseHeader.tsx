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
import { Lecture } from "@/interfaces/lecture";
import { DataPopup, LessonResponse } from "@/interfaces/api";
import PlayerListPopup from "@/components/PlayerListPopup/PlayerListPopup";

interface HeaderCourses  {
  data:LessonResponse,
  popupEndUser:DataPopup[],
  popupStartUser:DataPopup[]
}

const CourseHeader = ({ data , popupEndUser , popupStartUser}: HeaderCourses) => {
  const [course, setCourse] = useState<Lecture>();
  const [completedLessons, setCompletedLessons] = useState(0);
  const [totalPrize, setTotalPrize] = useState<number>(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [isNotStartCourse, setIsNotStartCourse] = useState<boolean>(true);

  const [showStartPopup, setShowStartPopup] = useState<boolean>(false);
  const [showEndPopup, setShowEndPopup] = useState<boolean>(false);

  useEffect(() => {
    if (data && data?.lectures?.length > 0) {
      setCourse(data.lectures[0]);
      const count = data.lectures.reduce((init, lecture) => {
        const isCompleted = lecture.userLecture.some(
          (userLecture: any) => userLecture.end_at !== null
        );
        return isCompleted ? init + 1 : init;
      }, 0);
      setCompletedLessons(count);

      const sumPrize = data.lectures.reduce((init, lecture) => {
        const prize = lecture.question.length * 10;
        return init + prize;
      }, 0);
      setTotalPrize(sumPrize);

      const isCourseNotStarted = data.lectures.every(
        (item) =>
          item?.userLecture[0]?.start_at === null ||
          item?.userLecture[0]?.start_at === undefined ||
          item?.userLecture[0] === undefined
      );
      setIsNotStartCourse(isCourseNotStarted);
    }
  }, [data, course]);

  const handleRatingClick = () => {
    setShowPopup(true);
  };
/*
  const fetchStartPlayers = async (): Promise<string[]> => {
    const response = await fetch(`/api/start-players?courseId=${data.id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch start players");
    }
    return response.json();
  };

  const fetchEndPlayers = async (): Promise<string[]> => {
    const response = await fetch(`/api/end-players?courseId=${data.id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch end players");
    }
    return response.json();
  };
*/
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
          courseId={course?.course ? course.course.id : 0}
          closed={setShowPopup}
        />
      </CustomPopup>
      <div className={`${styles.courseHeaderStyleWrapper} container`}>
        <div className={styles.CourseHeaderContainer}>
          <div>
            <Image
              src={course?.course?.logo || photoDefault}
              className={styles.courseLogo}
              width={200}
              height={200}
              alt="course logo"
            />
          </div>
          <div className={styles.userLogo}>
            <Link href={`/profile/${course?.course?.teacher.id}`}>
              <Image
                src={course?.course?.teacher.image || userDefault}
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
              courseId={course?.course ? course.course.id : 0}
            />
            {!isNotStartCourse && (
              <Button size="sm" variant="mint" onClick={handleRatingClick}>
                Rating
              </Button>
            )}
          </div>
          <h2 className={styles.courseName}>{course?.course?.name}</h2>
          <div className={styles.courseTitle}>{course?.course?.title}</div>
          <div className={styles.footerCourse}>
            <div className={styles.courseText}>
              <h5>
                Course Progress {completedLessons}/{data?.lectures?.length}
              </h5>
            </div>
            <ProgressBar
              progress={`
                ${(completedLessons * 100) / data?.lectures?.length}%`}
            />
            <div className={styles.courseText}>
              <h5>Total Prize {totalPrize} NGC</h5>
              <div className={styles.studentCount}>
                <div onClick={() => setShowStartPopup(true)} style={{ cursor: "pointer" }}>
                  <Image src={viewsIcon} height={25} width={25} alt="" />
                  {data?.counts?.[0]?._count?.start_time || 0}
                </div>
                <div onClick={() => setShowEndPopup(true)} style={{ cursor: "pointer" }}>
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
