"use server";

import { authFetch, isTokenValidServer } from "./utils/authFetch";
import { jwtDecode } from "jwt-decode";
import {
  UserProfileData,
  CourseData,
  ApiResponse,
  UserProfileResponse,
  CoursesResponse,
  LessonData,
  LessonResponse,
  QAResponse,
  QAData,
  CheckAnswerResponse,
  NgcResponse,
  UploadFileResponse,
  DataPopup,
  PlayersData,
} from "@/interfaces/api";
import { cookies } from "next/headers";
import { dataUrlToBlob } from "./utils/dataUrlToBlob";
import { CourseInProgress } from "./interfaces/course";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * this for extract user id from token by jwt-decode library
 * @returns userId from token
 */
export const getUserIdFromToken = async (): Promise<string | null> => {
  const cookieStore = cookies();
  const jwtToken = (await cookieStore).get("jwtToken")?.value;
  if (!jwtToken) {
    console.error("Token is missing. User may not be logged in.");
    return null;
  }

  try {
    const decodedToken = jwtDecode<{ id: string }>(jwtToken); //Decode the token
    return decodedToken.id;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
/**
 *
 * @param callback
 * @returns
 */
const validateTokenAndProceed = async (callback: () => Promise<any>) => {
  const isValid = await isTokenValidServer(true);
  if (!isValid) {
    return;
  }
  return callback();
};

/**
 * this methode work with responce Contains data and message
 * @param response this from backend
 * @param expectedMessage this message from backend
 * @returns response.data
 */

const handleResponse = <T>(
  response: ApiResponse<T>,
  expectedMessage: string
): T => {
  
  if ("error" in response) {
    return response as T;
  }

  if (
    response.message !== expectedMessage &&
    !response.message.includes(expectedMessage)
  ) {
    throw new Error(`Unexpected server response: ${response.message}`);
  }

  if (!response.data) {
    throw new Error("No data found in the response.");
  }

  return response.data;
};

/**
 * this method work with responce without data ex:updateUserProfile
 * @param response from backend
 * @param expectedMessage  this optional
 * @returns responce object without arg data
 */

const handleResponseWithoutData = (
  response: any,
  expectedMessage?: string
): any => {
  console.log("Response2:", response);

  if (expectedMessage && response.message !== expectedMessage) {
    throw new Error(`Unexpected server response: ${response.message}`);
  }

  if (!response) {
    throw new Error("No data found in the response.");
  }

  return response;
};

/**
 * this function for update profile and wizard
 * @param userData This parameter holds the data that will be transferred to the back end.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const updateUserProfile = async (
  userData: UserProfileData
): Promise<UserProfileResponse> => {
  return validateTokenAndProceed(async () => {
    const userId = await getUserIdFromToken();
    if (!userId) throw new Error("User ID is missing");

    const response = await authFetch<ApiResponse<UserProfileResponse>>(
      `${API_BASE_URL}/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    return handleResponseWithoutData(response);
  });
};

/**
 * this function for get profile By id
 * @param userId This parameter for user id.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const getUserProfile = async (
  playerId?: string | null
): Promise<UserProfileResponse> => {
  const userId = playerId || (await getUserIdFromToken());
  if (!userId) throw new Error("User ID is missing");

  const response = await authFetch<ApiResponse<UserProfileResponse>>(
    `${API_BASE_URL}/users/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return handleResponse(response, "find one user");
};

/**
 * this function for get profile By id
 * @param userId This parameter for user id.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const getUserProfileByUsername = async (
  username?: string | null
): Promise<UserProfileResponse> => {
  if (username) {
    const response = await authFetch<ApiResponse<UserProfileResponse>>(
      `${API_BASE_URL}/users/username/${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return handleResponse(response, "User fetched successfully");
  } else {
    return await getUserProfile(null);
  }
};

/**
 * this function for get all Course
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const getAllCoursesForTeacher = async (): Promise<CoursesResponse[]> => {
  return validateTokenAndProceed(async () => {
    const userId = await getUserIdFromToken();
    if (!userId) throw new Error("User ID is missing");

    const response = await authFetch<ApiResponse<CoursesResponse[]>>(
      `${API_BASE_URL}/courses/teacher/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return handleResponse(response, "findAll");
  });
};

/**
 * this function for get all Course
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const getProfileCourses = async (
  userId: string
): Promise<CoursesResponse[]> => {
  if (!userId) throw new Error("User ID is missing");

  const response = await authFetch<ApiResponse<CoursesResponse[]>>(
    `${API_BASE_URL}/courses/teacher/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return handleResponse(response, "findAll");
};

/**
 * this function for get all Course
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const getProfileCoursesByUsername = async (
  username: string
): Promise<CoursesResponse[]> => {
  if (!username) throw new Error("username is missing");

  const response = await authFetch<ApiResponse<CoursesResponse[]>>(
    `${API_BASE_URL}/courses/teacher/username/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return handleResponse(response, "findAll");
};

/**
 * this function for get all Course by status for Admin
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */

export const getAllCourseByStatus = async (): Promise<CoursesResponse[]> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<ApiResponse<CoursesResponse[]>>(
      `${API_BASE_URL}/courses/status/ALL`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return handleResponse(response, "findAll");
  });
};

/**
 * this function for status updated Course from Admin
 * @param courseData This parameter holds the data that will be transferred to the back end.
 * @param courseId this parameter for course id.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const updateCourseStatus = async (
  courseData: CourseData,
  courseId: number
): Promise<CoursesResponse> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<ApiResponse<CoursesResponse>>(
      `${API_BASE_URL}/courses/status/${courseId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      }
    );

    return handleResponse(response, "status updated");
  });
};

/**
 * this function for get Course By Id
 * @param courseId this parameter for course id.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const getCourseBySlug = async (
  courseSlug: string
): Promise<CoursesResponse> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<ApiResponse<CoursesResponse>>(
      `${API_BASE_URL}/courses/${courseSlug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return handleResponse(response, "findAll");
  });
};

/**
 * this function for create course
 * @param courseData This parameter holds the data that will be transferred to the back end.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const createCourse = async (
  courseData: CourseData
): Promise<CoursesResponse> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<ApiResponse<CoursesResponse>>(
      `${API_BASE_URL}/courses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      }
    );

    return handleResponse(response, "created");
  });
};

/**
 * this function for update course
 * @param courseData This parameter holds the data that will be transferred to the backend.
 * @param courseId this parameter for course id.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const updateCourse = async (
  courseData: CourseData,
  courseId: string
): Promise<CoursesResponse> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<ApiResponse<CoursesResponse>>(
      `${API_BASE_URL}/courses/${courseId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      }
    );

    return handleResponse(response, "updated");
  });
};

/**
 * this function for create lesson
 * @param lessonData This parameter holds the data that will be transferred to the backend.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const createLesson = async (
  lessonData: LessonData,
  courseId: string
): Promise<LessonResponse> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<ApiResponse<LessonResponse>>(
      `${API_BASE_URL}/course/${courseId}/lectures`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lessonData),
      }
    );

    return handleResponse(response, "created");
  });
};

/**
 * this function for update Lesson
 * @param lessonData This parameter holds the data that will be transferred to the backend.
 * @param lessonId this parameter for Lesson id.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */

export const updateLesson = async (
  lessonData: LessonData,
  courseId: string,
  lessonId: string
): Promise<LessonResponse> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<ApiResponse<LessonResponse>>(
      `${API_BASE_URL}/course/${courseId}/lectures/${lessonId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lessonData),
      }
    );

    return handleResponse(response, "updated");
  });
};

/**
 * this function for get all Lesson
 * @param courseId this parameter for Lesson id.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */

export const getAllLesson = async (
  courseId: string
): Promise<LessonResponse> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<ApiResponse<LessonResponse>>(
      `${API_BASE_URL}/course/${courseId}/lectures`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return handleResponse(response, "findAll");
  });
};

/**
 * this function for get Lesson By Id
 * @param courseId this parameter for course id.
 * @param lessonId this parameter for lesson id.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */

export const getLessonById = async (
  courseId: string,
  lessonId: string
): Promise<LessonResponse> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<ApiResponse<LessonResponse>>(
      `${API_BASE_URL}/course/${courseId}/lectures/${lessonId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return handleResponse(response, "found");
  });
};

/**
 * this function for create QA
 * @param qaData This parameter holds the data that will be transferred to the backend.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const createQA = async (
  qaData: QAData,
  courseId: string,
  lessonId: string
): Promise<QAResponse> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<ApiResponse<QAResponse>>(
      `${API_BASE_URL}/course/${courseId}/lecture/${lessonId}/questions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(qaData),
      }
    );

    return handleResponse(response, "created");
  });
};

/**
 * this function for update QA
 * @param qaData This parameter holds the data that will be transferred to the backend.
 * @param qaId this parameter for QA id.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const updateQA = async (
  qaData: QAData,
  courseId: string,
  lessonId: string,
  qaId: string
): Promise<QAResponse> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<ApiResponse<QAResponse>>(
      `${API_BASE_URL}/course/${courseId}/lecture/${lessonId}/questions/${qaId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(qaData),
      }
    );

    return handleResponse(response, "updated");
  });
};

/**
 * this function for found QA by id
 * @param lessonId this parameter for lesson id.
 * @param qaId this parameter for QA id.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const findQA = async (
  courseId: string,
  lessonId: string,
  qaId: string
): Promise<QAResponse> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<ApiResponse<QAResponse>>(
      `${API_BASE_URL}/course/${courseId}/lecture/${lessonId}/questions/${qaId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return handleResponse(response, "found");
  });
};

/**
 * this function for update order lesson
 * @param data This parameter holds the data that will be transferred to the backend.
 * @param courseId this parameter for course id.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const updateOrderLesson = async (
  data: any,
  courseId: string
): Promise<any> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<ApiResponse<any>>(
      `${API_BASE_URL}/course/${courseId}/lectures/orders`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return handleResponse(response, "updated");
  });
};

/**
 * this function for get Latest Course for user
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const getCoursesInProgress = async (): Promise<CourseInProgress[]> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<ApiResponse<CourseInProgress[]>>(
      `${API_BASE_URL}/user-courses`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return handleResponse(response, "findAll");
  });
};

/**
 * this function for get all courses
 * @returns data from backend
 */

export const getAllCourses = async (): Promise<CoursesResponse[]> => {
  const response = await authFetch<ApiResponse<CoursesResponse[]>>(
    `${API_BASE_URL}/courses/status/APPROVED`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("Response from getAllCourses:", response);
  return handleResponse(response, "findAll");
};

/**
 * this function for get all lecture
 * @method isTokenValid To verify the current session
 * @param courseId this parameter for course id.
 * @returns data from backend
 */
export const getAllLectureForCourse = async (
  slug: string
): Promise<LessonResponse> => {
  const isValid = await isTokenValidServer(true);
  let apiUrl;
  if (!isValid) {
    apiUrl = `${API_BASE_URL}/course/slug/${slug}/lectures`;
  } else {
    apiUrl = `${API_BASE_URL}/course/slugAuth/${slug}/lectures`;
  }

  const response = await authFetch<ApiResponse<LessonResponse>>(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse(response, "findAll Lectures by course slug");
};

/**
 * this function for get all qustion
 * @method isTokenValid To verify the current session
 * @param courseId this parameter for course id.
 * @param lectureId this parameter for lecture id.
 * @returns data from backend
 */
export const getAllQuestionsForLectureBySlug = async (
  lectureSlug: string
): Promise<QAResponse[]> => {
  const response = await authFetch<ApiResponse<QAResponse[]>>(
    `${API_BASE_URL}/course/lecture/questions/slug/${lectureSlug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return handleResponse(response, "find All Questions by lecture slug");
};

/**
 * this function for create user lecture
 * @method isTokenValid To verify the current session
 * @param courseId this parameter for course id.
 * @param lectureId this parameter for lecture id.
 */
export const createStartUserLectureInCourse = async (
  courseId: string,
  lectureId: string
): Promise<any> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<ApiResponse<void>>(
      `${API_BASE_URL}/user-lectures/course/start/${lectureId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return handleResponse(response, "created");
  });
};

/**
 * this function for create user lecture
 * @method isTokenValid To verify the current session
 * @param courseId this parameter for course id.
 * @param lectureId this parameter for lecture id.
 */
export const updateFinishLectureInCourse = async (
  courseId: string,
  lectureId: string
): Promise<any> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<ApiResponse<any>>(
      `${API_BASE_URL}/user-lectures/course/${courseId}/finish/${lectureId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return handleResponse(response, "updated");
  });
};

/**
 * this function for updated user lecture
 * @method isTokenValid To verify the current session
 * @param courseId this parameter for course id.
 */
export const createStartInCourse = async (courseId: string): Promise<any> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<ApiResponse<any>>(
      `${API_BASE_URL}/user-courses/start/${courseId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return handleResponse(response, "created");
  });
};

/**
 * this function for check answer
 * @method isTokenValid To verify the current session
 * @param courseId this parameter for course id.
 * @param lectureId this parameter for lecture id.
 * @param qustionId this parameter for qustion id.
 * @param answerIds this parameter for answer id checked.
 */
export const checkAnswer = async (
  courseId: string,
  lectureId: string,
  questionId: string,
  answerIds: number[]
): Promise<CheckAnswerResponse> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<ApiResponse<CheckAnswerResponse>>(
      `${API_BASE_URL}/user-lectures/course/${courseId}/answser/${lectureId}/question/${questionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answerId: answerIds }),
      }
    );

    return handleResponse(response, "answered");
  });
};

/**
 * this function for search on courses
 * @param text this parameter for course id.
 */
export const searchOnCourses = async (
  text: string
): Promise<CoursesResponse[]> => {
  const response = await authFetch<ApiResponse<CoursesResponse[]>>(
    `${API_BASE_URL}/courses/full-search/${text}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return handleResponse(response, "findAll courses about");
};

/**
 * this function for get all palyers
 * @returns data from backend
 */
export const getAllPlayers = async (page: any): Promise<PlayersData> => {
  const response = await authFetch<ApiResponse<PlayersData>>(
    `${API_BASE_URL}/users?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return handleResponse(response, "findAll");
};

/**
 * this function for get current ngcs
 * @returns data from backend
 */
export const getCurrentNgcs = async (): Promise<NgcResponse> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<ApiResponse<NgcResponse>>(
      `${API_BASE_URL}/users/ngcs`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return handleResponse(response, "found");
  });
};

/**
 * this function for claims ngcs Token
 * @method isTokenValid To verify the current session
 * @param ngcs this parameter for current ngcs.
 */
export const claimsNgcs = async (ngcs: number): Promise<any> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<ApiResponse<any>>(
      `${API_BASE_URL}/users/ngcs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ngcs }),
      }
    );

    return handleResponse(response, "found");
  });
};

/**
 * this function for upload image to imagekit
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */

export const uploadFile = async (
  fileUpload: any
): Promise<UploadFileResponse> => {
  return validateTokenAndProceed(async () => {
    if (fileUpload?.name === undefined) fileUpload = dataUrlToBlob(fileUpload);

    const formData = new FormData();
    formData.append("file", fileUpload);
    return validateTokenAndProceed(async () => {
      const response = await authFetch<ApiResponse<UploadFileResponse>>(
        `${API_BASE_URL}/upload/buffer`,
        {
          method: "POST",
          body: formData,
        }
      );

      if ("error" in response) {
        return response;
      }

      return response.data?.url;
    });
  });
};

/**
 * this function for get all palyers Attending the course in popup header
 * @returns data from backend
 */
export const fetchStartPlayers = async (
  courseSlug: string
): Promise<DataPopup[]> => {
  const response = await authFetch<ApiResponse<DataPopup[]>>(
    `${API_BASE_URL}/user-courses/${courseSlug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return handleResponse(response, "findAll");
};

/**
 * this function for get all palyers Completed the Course in popup header
 * @returns data from backend
 */
export const fetchEndPlayers = async (
  courseSlug: string
): Promise<DataPopup[]> => {
  const response = await authFetch<ApiResponse<DataPopup[]>>(
    `${API_BASE_URL}/user-courses/${courseSlug}?finished=true`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return handleResponse(response, "findAll");
};

/**
 * this function for check username is available
 * @method validateTokenAndProceed To verify the current session
 * @param username this parameter for username.
 */
export const checkUsernameIsAvailable = async (
  username: string
): Promise<any> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<any>(
      `${API_BASE_URL}/users/checkUsername/${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.message !== "Username is available") {
      throw new Error(`Unexpected server response: ${response.message}`);
    }

    return response.available;
  });
};

/**
 * this function for get profile By id
 * @param key This parameter for flag key.
 * @param value This parameter for flag value.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const updateUserFlags = async (
  key: string,
  value: boolean
): Promise<void> => {
  const parameter = JSON.stringify({
    key: key,
    value: value,
  });
  await authFetch<ApiResponse<UserProfileResponse>>(
    `${API_BASE_URL}/users/editFlag`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: parameter,
    }
  );
};
