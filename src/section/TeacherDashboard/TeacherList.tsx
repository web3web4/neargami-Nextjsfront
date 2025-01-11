"use client";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "./TeacherList.module.css";
import CourseCard from "./CourseCard/CourseCard";
import Button from "@/components/button/Button";
import { FiSearch } from "react-icons/fi";
import { ChangeEvent, useEffect, useState } from "react";
import { TeacherTabs } from "../../utils/Enums";
import { CoursesResponse } from "@/interfaces/api";

export const teacherTabs = [
  { tabName: TeacherTabs.Draft },
  { tabName: TeacherTabs.Rejected },
  { tabName: TeacherTabs.Approved },
];

const TeacherList = ({ courses }: { courses: CoursesResponse[] }) => {
  const [filterCourse, setFilterCourse] = useState<CoursesResponse[]>([]);

  useEffect(() => {
    setFilterCourse(courses);
  }, [courses]);

  const handelChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchVal = e.target.value.toLowerCase();
    const coursesFilter = searchVal
      ? courses.filter(
          (course) =>
            course.name.toLowerCase().includes(searchVal) ||
            course.title.toLowerCase().includes(searchVal) ||
            course.difficulty.toLowerCase().includes(searchVal)
        )
      : courses;
    setFilterCourse(coursesFilter);
  };

  return (
    <div className={styles.teacherDashboardWrapper}>
      <div className="container">
        <div>
          {courses.length > 0 ? (
            <Tabs>
              <TabList>
                <div className={styles.tabBtnWrapper}>
                  {teacherTabs.map((tap, i) => (
                    <Tab key={i}>
                      <button>
                        {tap.tabName} ({" "}
                        {
                          // TODO: improve to filter once for both here and in the TabPanel below. Or get them categorized already from the backend.
                          filterCourse.filter(
                            (course) =>
                              course.publish_status.toLowerCase() ===
                              tap.tabName.toLowerCase()
                          ).length
                        }{" "}
                        )
                      </button>
                    </Tab>
                  ))}
                </div>
              </TabList>
              <div className={styles.topSection}>
                <div className={styles.searchDiv}>
                  <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Search Course"
                    onChange={handelChangeSearch}
                  />
                  <button>
                    <FiSearch />
                  </button>
                </div>
                <Button size="md" variant="mint" href={`/course-info/add`}>
                  Add a Course
                </Button>
              </div>
              {teacherTabs.map((tap, i) => (
                <TabPanel key={i} className={`row ${styles.tabsRow}`}>
                  {filterCourse
                    .filter(
                      (course) =>
                        course.publish_status.toLowerCase() ===
                        tap.tabName.toLowerCase()
                    )
                    .map((filteredCourse, j) => (
                      <div key={j} className="col-lg-3 col-md-6">
                        <CourseCard {...filteredCourse} />
                      </div>
                    ))}
                </TabPanel>
              ))}
            </Tabs>
          ) : (
            <div className={styles.noCourses}>
              <p className={styles.noCoursesText}>
                Start by adding new courses.
              </p>
              <p className={styles.noCoursesText}>
                We will approve high-quality contents.
              </p>
              <br />
              <br />
              <br />
              <Button size="md" variant="mint" href={`/course-info`}>
                Add a Course
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherList;
