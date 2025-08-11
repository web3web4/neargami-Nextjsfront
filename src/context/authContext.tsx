"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { setCookie, getCookie/*, deleteCookie */} from "cookies-next";
import { IAuthContextType } from "../interfaces/auth";
import Swal from "sweetalert2";
import {jwtDecode} from "jwt-decode";
import { getSelector } from "../auth/nearAuth";
import { UserProfileData } from "@/interfaces/api";
import { getUserProfile } from "@/apiService";

// Authentication methods
export type AuthMethod = "NEAR" | "TELEGRAM" | null;

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [nearSignature, setNearSignature] = useState<string | null>(
    (getCookie("nearSignature") as string) || null
  );
  const [jwtToken, setJwtToken] = useState<string | null >(
    (getCookie("jwtToken") as string) || null
  );
  
  const [authMethod, setAuthMethod] = useState<AuthMethod>(
    (getCookie("authMethod") as AuthMethod) || null
  );
  
  const [userProfile, setUserProfile] = useState<UserProfileData>();

  const setAuthData = (key: string, value: any) => {
    if (key === "nearSignature") {
      setNearSignature(value);
      setCookie("nearSignature", value);
      if (value) {
        setAuthMethod("NEAR");
        setCookie("authMethod", "NEAR");
      }
    } else if (key === "jwtToken") {
      setJwtToken(value);
      setCookie("jwtToken", value);
    } else if (key === "authMethod") {
      setAuthMethod(value);
      setCookie("authMethod", value);
    }
  };
/*
 const isTokenValid = async (showMessage = true ): Promise<boolean> => {
    const selector = await getSelector();
  
    if (!jwtToken || jwtToken === "null") {
      if (showMessage) {
        Swal.fire({
          icon: "warning",
          title: "Session not available",
          text: "Please register or log in first.",
        });
      }
      return false;
    }
  
    const decodedToken = jwtDecode<{ exp: number }>(jwtToken); // Decode JWT token
    const now = Date.now() / 1000;
  
    if (decodedToken.exp < now) {
      if (showMessage) {
        Swal.fire({
          icon: "warning",
          title: "Session Expired",
          text: "Please log in again.",
        });
      }
      deleteCookie("jwtToken"); // Remove expired token
      return false;
    }
  
    try {
      await selector.wallet();
    } catch (error: any) {
      if (showMessage && error.message === "No wallet selected") {
        Swal.fire({
          icon: "warning",
          title: "No Wallet Connected",
          text: "Please connect a wallet to proceed.",
        });
      }
      return false;
    }
  
    return true; // Token is valid
  };
  
*/

useEffect(() => {
  if (!jwtToken) return;  

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();  
      if (response) {
        setUserProfile(response);  
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  fetchUserProfile();  

}, [jwtToken]);


useEffect(() => {
  const validateToken = async () => {
    if (!jwtToken) {
      Swal.fire({
        icon: "warning",
        title: "No Token Found",
        text: "Please log in to continue.",
      });
      return;
    }

    try {
      const decodedToken = jwtDecode<{ exp: number }>(jwtToken);
      const now = Date.now() / 1000;

      if (decodedToken.exp < now) {
        Swal.fire({
          icon: "warning",
          title: "Session Expired",
          text: "Your session has expired. Please log in again.",
        });
        //deleteCookie("jwtToken");
        setJwtToken(null);
        setAuthMethod(null);
      } 
      
      else if (authMethod === "NEAR") {
        // Only validate NEAR wallet if that's the auth method
        try {
          const selector = await getSelector();
          await selector.wallet();
        } catch (error) {
          console.error('NEAR wallet validation error:', error);
          setJwtToken(null);
          setAuthMethod(null);
        }
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Invalid Token",
        text: "The token is invalid or corrupted. Please log in again.",
      });
      console.error('error authContext',error);
      setJwtToken(null);
      setAuthMethod(null);
    }
  };

  if (jwtToken !== null) {
    validateToken();
  }
}, [jwtToken, authMethod]);


  return (
    <AuthContext.Provider
      value={{ nearSignature, jwtToken, userProfile, authMethod, setAuthData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
