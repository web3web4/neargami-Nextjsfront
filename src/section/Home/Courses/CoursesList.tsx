"use client";
import React, { useRef, useState } from "react";
import CourseCard from "./CourseCard/CourseCard";
import styles from "./CoursesList.module.css";
import { FiSearch } from "react-icons/fi";
import { searchOnCourses } from "@/apiService";
import { CoursesResponse, DataPopup } from "@/interfaces/api";

interface CourseList {
  courses:CoursesResponse[],
  popupEndUser:DataPopup[],
  popupStartUser:DataPopup[]
}
export default function CoursesList({courses,popupEndUser,popupStartUser}: CourseList) {

  const searchRef = useRef<HTMLInputElement>(null);
  const [filterCourses, setFilterCourses] =
    useState<CoursesResponse[]>(courses);
  const handleSearch = async () => {
    if (searchRef.current?.value.trim() !== "") {
      try {
        const response = await searchOnCourses(searchRef.current!.value);
        const coursesData: CoursesResponse[] = response;
        setFilterCourses(coursesData);
      } catch {}
    } else {
      setFilterCourses(courses);
    }
  };

  return (
    <div className={styles.courseWrapper}>
      <div className="container pb-5">
        <div>
          <div className={styles.breadcrumbForm}>
            <div className={styles.searchDiv}>
              <input
                ref={searchRef}
                type="text"
                id="search"
                name="search"
                placeholder="Search Course"
                onChange={() => handleSearch()}
              />
              <button
                id="btnSearch"
                aria-label="Search"
                onClick={() => handleSearch()}
              >
                <FiSearch />
              </button>
            </div>
            {/* <div className="btn" onClick={() => {}}>
              Newest
            </div>
            <div className="btn" onClick={() => {}}>
              Biggest Points
            </div>
            <div className="btn" onClick={() => {}}>
              My Courses
            </div>
            <div className="btn" onClick={() => {}}>
              All Courses
            </div> */}
          </div>
        </div>
        <div className="row">
          {filterCourses &&
            filterCourses.map((filteredCourse, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <CourseCard props={filteredCourse} popupEndUser={popupEndUser} popupStartUser={popupStartUser}/>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
