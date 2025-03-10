"use client";
import { useEffect, useState } from "react";
import styles from "./Tabs.module.css";
import CoursesList from "../CourseList/CoursesList";
import { CoursesResponse } from "@/interfaces/api";
import { useTranslations } from "next-intl";

interface TabsProps {
  offeredCourses?: CoursesResponse[];
  finishedCourses?: CoursesResponse[];
}

const Tabs = ({ offeredCourses, finishedCourses }: TabsProps) => {
  const [filterCourses, setFilterCourses] = useState<CoursesResponse[]>([]);
  const [currCourses, setCurrCourses] = useState<CoursesResponse[]>(finishedCourses ?? []);
  const [text, setText] = useState<string>("There are no courses finished yet");
  const [activeTab, setActiveTab] = useState<string>("finishedCourses");
  const translate = useTranslations("Profile");

  const handleOnClick = (currTab: string) => {
    setActiveTab(currTab);
    if (currTab === "offeredCourses") {
      setCurrCourses(filterCourses ?? []);
      setText("There are no courses published yet");
    } else {
      setCurrCourses(finishedCourses ?? []);
      setText("There are no courses finished yet");
    }
  };

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
            activeTab === "offeredCourses" ? styles.active : ""
          }`}
          onClick={() => handleOnClick("offeredCourses")}
        >
          {translate("offeredCourses")}
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
