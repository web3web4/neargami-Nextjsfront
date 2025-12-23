"use client";
import React, { useRef } from "react";
import CourseCard from "./CourseCard/CourseCard";
import { FiSearch } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { CoursesResponse } from "@/interfaces/api";
import { useHomeSearch, useHome } from "@/hooks";
import styles from "./CoursesList.module.css";

interface CourseList {
  initCourses: CoursesResponse[],
}
export default function CoursesList({ initCourses }: CourseList) {
  useHome();
  const searchRef = useRef<HTMLInputElement>(null);
  const translate = useTranslations("Home");
  const { handleSearch, filterCourses } = useHomeSearch(searchRef, initCourses);

  return (
    <div id="courses-list" className={styles.courseWrapper}>
      <div className="container pb-5">
        <div>
          <div className={styles.breadcrumbForm}>
            <div className={styles.searchDiv}>
              <input
                ref={searchRef}
                type="text"
                id="search"
                name="search"
                placeholder={translate("Search Course")}
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
          </div>
        </div>
        <div className="row">
          {filterCourses &&
            filterCourses.map((filteredCourse, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <CourseCard props={filteredCourse} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
