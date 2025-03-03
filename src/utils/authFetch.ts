"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
//import router from "next/router";
//import Swal from "sweetalert2";

/**
 * Authenticated fetch function
 * @param url API URL
 * @param options Fetch options
 * @returns {Promise<any>} Response JSON
 */
export const authFetch = async <T>(url: string, options: RequestInit = {}): Promise<T | { error: true; status: number; message: string }> => {
  const cookieStore = cookies();
  const jwtToken = (await cookieStore).get("jwtToken")?.value;
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${jwtToken}`,
  };

  try {
    const response = await fetch(url, { ...options, headers });

    if (![200, 201, 204, 304].includes(response.status)) {
      const errorDetails = await response.json();
      if (typeof window !== "undefined") {
        window.location.href = `/bad-request?code=${
          response.status
        }&message=${encodeURIComponent(
          errorDetails.message || "An error occurred."
        )}`;
      }
      
      return {
        error: true,
        status: response.status,
        message: errorDetails.message || "An error occurred.",
      };
    }

    const jsonResponse = await response.json();
    return jsonResponse as T;
  } catch {
    return {
      error: true,
      status: 500,
      message: "Failed to connect to server.",
    };
  }
};


/**
 * this for api without jwtToken
 */
export const fetchWithoutJwt = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const headers = {
    ...options.headers,
  };
  try {
    const response = await fetch(url, { ...options, headers });

    if (![200, 201, 204].includes(response.status)) {
      const errorDetails = await response.json();
      throw new Error(`HTTP error! Status: ${response.status}`, {
        cause: errorDetails,
      });
    }
    const jsonResponse = await response.json();
    return jsonResponse as T;
  } catch (error: any) {
    console.error("authFetch error:", error.message);
    throw error;
  }
};

/**
 * this for check jwtToken
 */
export const isTokenValidServer = async (showMessage = true): Promise<any> => {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("jwtToken")?.value;
  const token = cookieStore.get("jwtToken");
  if (!jwtToken || !token) {
    console.warn("JWT Token not found in cookies.");

    if (showMessage) {
      console.log("Session not available");

      /*
        Swal.fire({
          icon: "warning",
          title: "Session not available",
          text: "Please register or log in first.",
        });
        */
    }
    return false;
  }

  const decodedToken = jwtDecode<{ exp: number }>(jwtToken); // Decode JWT token
  const now = Date.now() / 1000;

  if (decodedToken.exp < now) {
    if (showMessage) {
      console.log("Session Expired");
      /*
        Swal.fire({
          icon: "warning",
          title: "Session Expired",
          text: "Please log in again.",
        });
        */
    }
    return false;
  }

  return true;
};
