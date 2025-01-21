import { Slider, SliderItem } from "@/components/slider/Slider";
import ProgressBar from "@/components/progressBar/v1/ProgressBar";
import styles from "./CourseCard.module.css";
import studentIcon from "@/assets/images/icons/student.svg";
import viewsIcon from "@/assets/images/icons/view.svg";
import photoDefault from "@/assets/images/no-Course.png";
import userDefault from "@/assets/images/no-User.png";
import { CourseInProgress } from "@/interfaces/course";
import Image from "next/image";
import Link from "next/link";

const CourseCard = ({ data }: { data: CourseInProgress[] }) => {
  const sliderSettings = {
    dots: true,
    arrows: false,
    autoplay: false,
    speed: 1500,
    autoplaySpeed: 4000,
    cssEase: "linear",
    centerMode: true,
    centerPadding: "0px",
    infinite: data.length > 1,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={`${styles.courseCardWrraper} container`}>
      <h2 className={styles.title}>Courses In Progress</h2>
      <Slider {...sliderSettings}>
        {data?.map((courseDetail, i) => (
          <SliderItem key={i}>
            <Link href={`/course-details/${courseDetail.course_id}`}>
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
                    <div className={styles.courseEndLesson}>
                      Course Progress {courseDetail.endedLecturesCount}/
                      {courseDetail?.course.lecture?.length}
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
                  <ProgressBar
                    progress={`${
                      (courseDetail.endedLecturesCount * 100) /
                      courseDetail?.course.lecture?.length
                    }%`}
                  />
                </div>
                <div className={styles.courseMoreDetails}>
                  <h5>Total Prize {courseDetail.totalPoints} NGC</h5>
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
          </SliderItem>
        ))}
      </Slider>
    </div>
  );
};

export default CourseCard;
