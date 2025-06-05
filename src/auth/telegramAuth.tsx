"use client";

import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { ITelegramContextType, ITelegramUser, ITelegramParsedData } from "../interfaces/auth";
import { setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const TelegramContext = createContext<ITelegramContextType | undefined>(undefined);

// Parse Telegram initData to extract user information
export function parseTelegramInitData(initData: string): ITelegramParsedData {
  const params = new URLSearchParams(initData);
  const userJson = params.get("user");
  let user: ITelegramUser = {} as ITelegramUser;

  try {
    if (userJson) {
      user = JSON.parse(decodeURIComponent(userJson));
    }
  } catch (e) {
    console.error("Failed to parse Telegram user data:", e);
  }

  return {
    telegramId: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    username: user.username,
    authDate: params.get("auth_date"),
    hash: params.get("hash")
  };
}

export const TelegramProvider = ({ children }: { children: ReactNode }) => {
  const { setAuthData, jwtToken } = useAuth();
  const router = useRouter();
  
  // Automatically authenticate when in Telegram WebApp environment
  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      // Tell Telegram that the Mini App is ready
      window.Telegram.WebApp.ready();
      
      // Expand the Mini App to its maximum allowed height
      window.Telegram.WebApp.expand();
      
      // Auto-authenticate if we don't have a token yet
      if (!jwtToken) {
        handleTelegramLogin();
      }
    }
  }, [jwtToken]);

  const handleTelegramLogin = async () => {
    try {
      // Check if we're in a Telegram WebApp environment
      if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
        const webApp = window.Telegram.WebApp;
        
        // Get the initData from Telegram WebApp
        const initData = webApp.initData;
        
        if (!initData) {
          console.error("No Telegram initData available");
          return;
        }

        // Parse the initData
        const parsedData = parseTelegramInitData(initData);

        // Send the initData directly to backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/telegram`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-telegram-init-data": initData
          },
          body: JSON.stringify(parsedData)
        });

        if (response.status === 201) {
          const authData = await response.json();
          
          const jwtToken = authData.data.token;
          setAuthData("jwtToken", jwtToken);
          setAuthData("authMethod", "TELEGRAM");

          // This Flag For Show Course Intro, When First Show Home Page After Connect
          if (authData.data.user.flags.first_request_approved_courses === false) {
            setCookie("firstShowingOfHome", false);
          }

          // Navigate user based on login state
          if (authData.data.user.flags.new_user === true) {
            router.push("/wizard");
          } else {
            router.refresh();
          }
        } else {
          console.error("Telegram authentication failed");
        }
      }
    } catch (error: any) {
      console.error("Telegram login error:", error.message);
    }
  };

  const handleTelegramLogout = async () => {
    try {
      // Clear cookies for the user
      setAuthData("jwtToken", null);
      setAuthData("authMethod", null);
      deleteCookie("jwtToken");
      deleteCookie("authMethod");

      // Close the Telegram Mini App if in that environment
      if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.close();
      } else {
        // Redirect to homepage if not in Telegram Mini App
        window.location.replace("/");
      }
    } catch (error: any) {
      console.error("Telegram logout error:", error.message);
    }
  };

  return (
    <TelegramContext.Provider value={{ handleTelegramLogin, handleTelegramLogout }}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => {
  const context = useContext(TelegramContext);
  if (!context)
    throw new Error("useTelegram must be used within a TelegramProvider");
  return context;
};

// Add this to global window type
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData: string;
        close: () => void;
        ready: () => void;
        expand: () => void;
        [key: string]: any;
      };
    };
  }
} 