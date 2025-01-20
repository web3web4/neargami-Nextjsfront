"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { getCourseById, getCoursesInProgress } from "@/apiService";
import { getCookie, setCookie } from "cookies-next";
import { CourseInProgress } from "@/interfaces/course";
import { useAuth } from "@/context/authContext";

export const useHome = () => {
  const route = useRouter();
  const [courses, setCourses] = useState<CourseInProgress[]>([]);
  const { jwtToken } = useAuth();

  const GetIntroCourse = async () => {
    const courseId = process.env.NEXT_PUBLIC_INTRODUCTORY_COURSE ?? "12";
    try {
      const response = await getCourseById(courseId);
      const courseData = response.data;
      setCookie("firstShowingOfHome", false);
      Swal.fire({
        html: `
              <div style="text-align: center;">
                <h2 style="margin-bottom: 20px; color: #1a1a2f">Welcome to NearGami!</h2>
                <img src="${courseData.logo}" alt="Course Image" width="150" height="150" style="display: block; margin: 0 auto; margin-bottom: 10px;">
                <h3 style="font-weight: bold; color: #282841;">${courseData.name}</h3>
                <p>To help you get started, we recommend our introductory course to learn more about our features and how to make the most out of your experience.</p>
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
          route.push(`/course-detials/${courseId}`);
        },
      });
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
      GetIntroCourse();
    }
  });

  return { courses };
};
