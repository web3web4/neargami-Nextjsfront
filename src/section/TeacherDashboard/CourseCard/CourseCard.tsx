import Button from "@/components/button/Button";
import photoDefault from "@/assets/images/no-Course.png";
import styles from "./CourseCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { CoursesResponse } from "@/interfaces/api";
import CardButtons from "./CardButtons/CardButtons";
import { useTranslations } from "next-intl";

const CourseCard = ({
  id,
  logo,
  name,
  title,
  difficulty,
  publish_status,
  isAdmin,
  slug
}: CoursesResponse) => {
    const translate = useTranslations("TeacherDashboard");
  
  return (
    <div className={styles.courseCard}>
      <div className={styles.courseInfo}>
        <Link href={`/show-lesson/${id}`}>
          <Image
            src={logo || photoDefault}
            width={500}
            height={500}
            alt="course logo"
          />
        </Link>
        <div className={styles.courseAuthor}>
          <h4 className="mb-10">
            <a href={`/show-lesson/${id}`}>{name}</a>
          </h4>
          <div>{title}</div>
        </div>
      </div>

      <div className={styles.courseContent}>
        <div className={styles.courseHeader}>
          <div className={styles.headingTitle}>
            <h4>{difficulty}</h4>
          </div>
        </div>
      </div>
      <div className={styles.publishStatus}>
        {isAdmin ? (
          <CardButtons id={id!} slug={slug!} publish_status={publish_status} style={styles.publishStatus}/>
        ) : publish_status.toUpperCase() !== "REJECTED" ? (
          <Button variant="mint" size="sm" href={`/course-info/${slug}`}>
            {translate("Edit")}
          </Button>
        ) : (
          <h4>{publish_status}</h4>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
