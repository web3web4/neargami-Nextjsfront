"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  getCourseBySlug,
  getCoursesInProgress,
  updateUserFlags,
} from "@/apiService";
import { deleteCookie, getCookie } from "cookies-next";
import { CourseInProgress } from "@/interfaces/course";
import { useAuth } from "@/context/authContext";
import { useTranslations } from "next-intl";

export const useHome = () => {
  const route = useRouter();
  const [courses, setCourses] = useState<CourseInProgress[]>([]);
  const translate = useTranslations("messages");
  const { jwtToken } = useAuth();

  const GetIntroCourse = async () => {
    const courseSlug = process.env.NEXT_PUBLIC_INTRODUCTORY_COURSE;
    try {
      const response = await getCourseBySlug(courseSlug!);
      Swal.fire({
        html: `
              <div style="text-align: center;">
                <h2 style="margin-bottom: 20px; color: #1a1a2f">${translate("Welcome to NearGami")}!</h2>
                <img src="${response.logo}" alt="Course Image" width="150" height="150" style="display: block; margin: 0 auto; margin-bottom: 10px;">
                <h3 style="font-weight: bold; color: #282841;">${response.name}</h3>
                <p>${translate("To help you get started we recommend our introductory course to learn more about our features and how to make the most out of your experience")}</p>
              </div>
            `,
        didOpen: () => {
          const confirmButton = Swal.getConfirmButton();
          if (confirmButton) {
            confirmButton.style.backgroundColor = "#01c780";
            confirmButton.style.color = "#1a1a2f";
          }
        },
        showCancelButton: true,
        confirmButtonText: "Start Now",
        cancelButtonText: "Maybe Later",
        preConfirm: () => {
          route.push(`/course-details/${courseSlug}`);
        },
      });
      updateUserFlags("first_request_approved_courses", true);
      deleteCookie("firstShowingOfHome");
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCoursesInProgress();
        if (response) {
          const coursesData = response;
          setCourses(coursesData);
        }
      } catch (error) {
        console.error("Error fetching courses data:", error);
      }
    };

    if (jwtToken) fetchCourses();
  }, [jwtToken]);

  useEffect(() => {
    if (getCookie("firstShowingOfHome") === "true") {
      setTimeout(function () {
        GetIntroCourse();
      }, 3000);
    }
  });

  return { courses };
};
