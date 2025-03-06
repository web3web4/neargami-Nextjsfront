import TotalRating from "@/components/totalRating/TotalRating";
import ngcIcons from "@/assets/images/brand/Logo/Without-BG/Logo-3-Size/32.png";
import styles from "./CoursesList.module.css";
import studentIcon from "@/assets/images/icons/student.svg";
import viewsIcon from "@/assets/images/icons/view.svg";
import photoDefault from "@/assets/images/no-Course.png";
import userDefault from "@/assets/images/no-User.png";
import Link from "next/link";
import Image from "next/image";
import CardHover from "@/components/cardHover/CardHover";
import { CoursesResponse } from "@/interfaces/api";

const CoursesList = (props: CoursesResponse) => {
  return (
    <div className={styles.courseCard}>
      <Link href={`/course-details/${props.slug}`}>
        <div className={styles.courseInfo}>
          <div>
            <Image src={ngcIcons} width={23} alt="" /> {props.total_score} NGC
          </div>
          <Image
            src={props.logo || photoDefault}
            width={400}
            height={400}
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
            <h2>{props.difficulty}</h2>
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
        <div>
          <Image src={viewsIcon} width={25} alt="" />
          {props.counts?._count?.start_time || 0}
        </div>
        <div>
          <Image src={studentIcon} width={25} alt="" />
          {props.counts?._count?.end_time || 0}
        </div>
      </div>
      <CardHover styles={styles} />
    </div>
  );
};

export default CoursesList;
