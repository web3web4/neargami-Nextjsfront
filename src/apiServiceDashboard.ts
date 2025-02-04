import { ApiResponse, KeywordsSearch, UserProfileData, UserProfileResponse } from "./interfaces/api";
import { authFetch, isTokenValidServer } from "./utils/authFetch";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

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
/*
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

*/
/**
 * this function for get admins
 * @param userId This parameter for user id.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const getUserAdmin = async (): Promise<UserProfileResponse> => {
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

  const allUsers = handleResponse<UserProfileData[]>(response, "findAll");

  return allUsers.filter(user => !user.isAdmin);
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