"use client";
import { useEffect, useState } from "react";
import styles from "./Tabs.module.css";
import CoursesList from "../CourseList/CoursesList";
import { CoursesResponse } from "@/interfaces/api";
import { useTranslations } from "next-intl";
import { MyCourses } from "@/interfaces/course";

interface TabsProps {
  tabTwoName: string;
  finishedCourses?: CoursesResponse[];
  offeredCourses?: CoursesResponse[];
  inProgressCourses?: MyCourses[];
}

const Tabs = ({ tabTwoName, finishedCourses, offeredCourses, inProgressCourses }: TabsProps) => {
  const [filterCourses, setFilterCourses] = useState<CoursesResponse[]>([]);
  const [progressCourse, setProgressCourse] = useState<CoursesResponse[]>([]);
  const [currCourses, setCurrCourses] = useState<CoursesResponse[]>(finishedCourses ?? []);
  const [text, setText] = useState<string>("There are no courses finished yet");
  const [activeTab, setActiveTab] = useState<string>("finishedCourses");
  const translate = useTranslations("Profile");

  const handleOnClick = (currTab: string) => {
    setActiveTab(currTab);
    if (currTab === "offeredCourses") {
      setCurrCourses(filterCourses ?? []);
      setText("There are no courses published yet");
    } else if (currTab === "inProgressCourses"){
      setCurrCourses(progressCourse ?? []);
      setText("There are no courses published yet");
    } else {
      setCurrCourses(finishedCourses ?? []);
      setText("There are no courses finished yet");
    }
  };

  useEffect(() => {
    if(inProgressCourses){
      const courses = inProgressCourses.map((curr) => {
        return {
          id: curr.course.id,
          name: curr.course.name,
          logo: curr.course.logo,
          total_score: curr.course.total_score,
          tag: curr.course.tag,
          difficulty: curr.course.difficulty,
          slug: curr.course.slug,
          teacher: {
            id: curr.course.teacher.id,
            username: curr.course.teacher.username,
            image: curr.course.teacher.image,
          },
          counts: {
            _count: {
              start_time: curr.counts._count.start_time,
              end_time: curr.counts._count.end_time
            }
          }
        }
      })
      setProgressCourse(courses);
    } 
    console.log(inProgressCourses)
  }, [inProgressCourses]);

  useEffect(() => {
    if (offeredCourses) {
      const approvedCourses = offeredCourses.filter(
        (course) => course.publish_status === "APPROVED"
      );
      setFilterCourses(approvedCourses);
    } else {
      setFilterCourses([]);
    }
  }, [offeredCourses]);

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "finishedCourses" ? styles.active : ""
          }`}
          onClick={() => handleOnClick("finishedCourses")}
        >
          {translate("finishedCourses")}
        </button>

        <button
          className={`${styles.tabButton} ${
            activeTab === tabTwoName ? styles.active : ""
          }`}
          onClick={() => handleOnClick(tabTwoName)}
        >
          {translate(tabTwoName)}
        </button>
      </div>
      <div className="row">
        {currCourses && currCourses.length > 0 ? (
          currCourses.map((filteredCourse, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <CoursesList {...filteredCourse} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p className={styles.sectionCourses}>{translate(text)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
