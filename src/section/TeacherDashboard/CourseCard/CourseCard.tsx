import Button from "@/components/button/Button";
import photoDefault from "@/assets/images/no-Course.png";
import styles from "./CourseCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { CoursesResponse } from "@/interfaces/api";
import { useTranslations } from "next-intl";

const CourseCard = ({
  id,
  logo,
  name,
  title,
  difficulty,
  publish_status,
  slug,
}: CoursesResponse) => {
  const translate = useTranslations("TeacherDashboard");
  const transDifficulty = useTranslations("CourseDifficulty");

  return (
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
            <a href={`/show-lesson/${id}/${slug}`}>{name}</a>
          </h4>
          <div>{title}</div>
        </div>
      </div>

      <div className={styles.courseContent}>
        <div className={styles.courseHeader}>
          <div className={styles.headingTitle}>
            <h4>{transDifficulty(difficulty)}</h4>
          </div>
        </div>
      </div>
      <div className={styles.publishStatus}>
        {publish_status.toUpperCase() !== "REJECTED" ? (
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
