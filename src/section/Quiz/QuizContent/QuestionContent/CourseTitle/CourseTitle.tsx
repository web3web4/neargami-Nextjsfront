import ngcIcons from "@/assets/images/brand/Logo/Without-BG/Logo-3-Size/32.png";
import photoDefault from "@/assets/images/no-Course.png";
import Image from "next/image";
import styles from "./CourseTitle.module.css";
import { useTranslations } from "next-intl";

interface CourseTitleProps{
  courseLogo: string, 
  lessonNumber: number,
  points: number
}

export default function CourseTitle({ courseLogo, lessonNumber, points }: CourseTitleProps) {
  const translate = useTranslations('Quiz');
  return (
    <div>
      <div className={styles.title}>
        <div className={styles.titleContent}>
          <div>
            <Image src={ngcIcons} alt="" width={30} height={30} /> {points}
          </div>
          <div className={styles.titleRight}>
            <Image
              src={courseLogo ?? photoDefault}
              width={35}
              height={30}
              alt="course logo"
              style={{ width: "auto", height: "auto" }}
            />
            <div className={styles.lessonNumber}>
              <div>{translate("Lesson")}</div>
              <div>#{lessonNumber}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
