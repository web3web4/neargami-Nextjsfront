"use server";

import { ApiResponse, CourseData, CoursesResponse, CoursesVersionResponse, KeywordsSearch, LogsServer, UserProfileData, UserProfileResponse } from "./interfaces/api";
import { authFetch, isTokenValidServer } from "./utils/authFetch";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const PASS_FOR_ADMIN = process.env.NEXT_PUBLIC_PASS_FOR_ADMIN;


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
  console.log("Response:", response);

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
 * this function for get admins
 * @param userId This parameter for user id.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const getUserAdmin = async (): Promise<UserProfileResponse[]> => {
    return validateTokenAndProceed(async () => {
        const response = await authFetch<ApiResponse<UserProfileResponse>>(
            `${API_BASE_URL}/users/admin`,
            {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            }
        );

        return handleResponse(response, "findAll Admins");
    });
};

/**
 * this function for get all palyers
 * @returns data from backend
 */
export const getAllCustomers = async (): Promise<UserProfileData[]> => {
  const response: ApiResponse<UserProfileResponse[]> = await authFetch(
    `${API_BASE_URL}/users`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = handleResponse<unknown>(response, "findAll");

  const users = (data as { users?: UserProfileData[] })?.users;

  if (!Array.isArray(users)) {
    console.error("Expected 'users' to be an array but got:", users);
    return [];
  }

  const customers: UserProfileData[] = [];
  users.forEach(user => {
    if (!user.isAdmin) {
      customers.push(user);
    }
  });

  return customers;

};


/**
 * this function for bloack user from website
 * @param userId this parameter for user id.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const bloackUser = async (
  userId: string,
): Promise<UserProfileData> => {
  return validateTokenAndProceed(async () => {
    const response = await authFetch<ApiResponse<UserProfileData>>(
      `${API_BASE_URL}/auth/block`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( {id : userId} ),
      }
    );

    return handleResponse(response, "block");
  });
};

/**
 * this function for get all keyWords search from frontend
 * @returns data from backend
 */
export const keyWordsSearch = async (): Promise<KeywordsSearch[]> => {
  return validateTokenAndProceed(async () => {

  const response = await authFetch <ApiResponse<KeywordsSearch[]>>(
    `${API_BASE_URL}/courses/keywords`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return handleResponse(response, "keywords");
});

};

/**
 * this function for get all courses
 * @returns data from backend
 */

export const getAllCourses = async (): Promise<CoursesResponse[]> => {
  const response = await authFetch<ApiResponse<CoursesResponse[]>>(
    `${API_BASE_URL}/courses/status/ALL`,
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
 * this function make admin
*/

export const makeAdmin = async (userId:string): Promise<UserProfileResponse> => {
  return validateTokenAndProceed(async () => {
      const response = await authFetch<ApiResponse<UserProfileResponse>>(
          `${API_BASE_URL}/users/addAdmin/${userId}`,
          {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ pass:PASS_FOR_ADMIN }),
          }
      );

      return handleResponseWithoutData(response);
  });
};

/**
 * this function for delete user
 * @param userId 
 * @returns 
 */
export const deleteUser = async (userId:string): Promise<UserProfileResponse> => {
  return validateTokenAndProceed(async () => {
      const response = await authFetch<ApiResponse<UserProfileResponse>>(
          `${API_BASE_URL}/users/${userId}`,
          {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
          },
          }
      );

      return handleResponseWithoutData(response);
  });
};


/**
 * this function Cancel Admin
*/

export const cancelAdmin = async (userId:string): Promise<UserProfileResponse> => {
  return validateTokenAndProceed(async () => {
      const response = await authFetch<ApiResponse<UserProfileResponse>>(
          `${API_BASE_URL}/users/removeAdmin/${userId}`,
          {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ pass:PASS_FOR_ADMIN }),
          }
      );

      return handleResponseWithoutData(response);
  });
};

/**
 * this function for status updated Course from Admin
 * @param courseStatus This parameter holds the data that will be transferred to the back end.
 * @param courseId this parameter for course id.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const updateCourseStatus = async (
  courseStatus: CourseData,
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
        body: JSON.stringify(courseStatus),
      }
    );

    return handleResponse(response, "status updated");
  });
};

/**
 * this function for delete user
 * @param userId 
 * @returns 
 */
export const deleteCourse = async (courseId:number | string): Promise<CoursesResponse> => {
  return validateTokenAndProceed(async () => {
      const response = await authFetch<ApiResponse<CoursesResponse>>(
          `${API_BASE_URL}/courses/${courseId}`,
          {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
          },
          }
      );

      return handleResponseWithoutData(response);
  });
};

/**
 * this function for delete user
 * @returns data from backen include all logs from frontend
 */
export const logServer = async (): Promise<LogsServer[]> => {
  return validateTokenAndProceed(async () => {
      const response = await authFetch<ApiResponse<LogsServer[]>>(
          `${API_BASE_URL}/logs`,
          {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
          }
      );

      return handleResponse(response, "foundAll");
    });
};


export const getCourseVersion = async (id?:number): Promise<CoursesVersionResponse[]> => {
  return validateTokenAndProceed(async () => {
      const response = await authFetch<ApiResponse<CoursesVersionResponse[]>>(
          `${API_BASE_URL}/courses/versions/${id}`,
          {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
          }
      );

      return handleResponse(response, "All course versions retrieved successfully");
    });
};

/**
 * this function for submit what's new in new version couse
 * @param courseId this couse id
 * @param text this text for what's new 
 * @returns 
 */
export const submitWhatsNewVersionCourse = async (text:string , courseId?:string | number): Promise<CoursesResponse> => {
  return validateTokenAndProceed(async () => {
      const response = await authFetch<ApiResponse<CoursesResponse>>(
          `${API_BASE_URL}/courses/newversion/withwhatsnew/${courseId}`,
          {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({whats_new : text}),
          }
      );

      return handleResponse(response, "A new version created");
    });
};