import ProgressBar from "@/components/progressBar/v1/ProgressBar";
import styles from "./CourseCard.module.css";
import studentIcon from "@/assets/images/icons/student.svg";
import viewsIcon from "@/assets/images/icons/view.svg";
import photoDefault from "@/assets/images/no-Course.png";
import userDefault from "@/assets/images/no-User.png";
import { MyCourses } from "@/interfaces/course";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const CourseCard = ({ data }: { data: MyCourses[] }) => {
  const translate = useTranslations("MyCourses");


  return (
    <div className={`${styles.courseCardWrraper} container`}>
      <h2 className={styles.title}>{translate("Courses In Progress")}</h2>
        {data?.map((courseDetail, i) => (
            <Link  key={i} href={`/course-details/${courseDetail.course.slug}`}>
              <div className={styles.courseCardWrpapper}>
                <div className={styles.courseContent}>
                  <div className={styles.coursrCardLeftSection}>
                    <div className={styles.courseLogoInner}>
                      <div className={styles.courseLogo}>
                        <Image
                          src={courseDetail.course.logo || photoDefault}
                          width={125}
                          height={125}
                          alt="course logo"
                        />
                      </div>
                    </div>     
                  </div>
                  <div className={styles.teacherImage}>
                    <Image
                      src={courseDetail.course.teacher.image || userDefault}
                      width={70}
                      height={70}
                      alt="teacher image"
                    />
                  </div>
                  <div className={styles.courseCardRightSection}>
                    <h4>{courseDetail.course.name}</h4>
                    <h6>{courseDetail.course.title}</h6>
                  </div>
                </div>
                <div className={styles.progressInner}>
                  <div className={styles.courseEndLesson}>
                      {translate("Course Progress")}{" "}
                      {courseDetail.endedLecturesCount}/
                      {courseDetail?.course.lecture?.length}
                  </div>
                  <ProgressBar
                    progress={`${
                      (courseDetail.endedLecturesCount * 100) /
                      courseDetail?.course.lecture?.length
                    }%`}
                  />
                </div>
                <div className={styles.courseMoreDetails}>
                  <h5>
                    {translate("Total Prize")} {courseDetail.totalPoints} NGC
                  </h5>
                  <div className={styles.studentCount}>
                    <div>
                      <Image src={viewsIcon} height={25} width={25} alt="" />
                      {courseDetail.counts?._count?.start_time || 0}
                    </div>
                    <div>
                      <Image src={studentIcon} height={25} width={25} alt="" />
                      {courseDetail.counts?._count?.end_time || 0}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
        ))}
    </div>
  );
};

export default CourseCard;
