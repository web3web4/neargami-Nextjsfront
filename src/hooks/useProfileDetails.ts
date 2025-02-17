"use client";
import { useLoading } from "@/context/LoadingContext";
import { useEffect, useRef, useState } from "react";
import { getBalance } from "@/lib/nearContractToken";
import {claimsNgcs, getCurrentNgcs, getUserProfileByUsername} from "@/apiService";
import Swal from "sweetalert2";
import { UserProfileData } from "@/interfaces/api";
import { useAuth } from "@/context/authContext";
import { useTranslations } from "next-intl";

export const useProfileDetails = (username: string | null) => {
  const [data, setData] = useState<UserProfileData>({});
  const [balance, setBalance] = useState<string | null>("0");
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null); // Error state for handling loading errors
  const unityInstanceRef = useRef<null | { Quit: () => Promise<void> }>(null); // Ref to store the Unity instance
  const unityLoaderScriptRef = useRef<null | HTMLScriptElement>(null); // Ref to store the loader script
  const { setIsLoading } = useLoading();
  const { userProfile, jwtToken } = useAuth();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const translate = useTranslations("messages");
  console.log(balance);
  console.log(error);

  useEffect(() => {
    window.GetUserID = () => username || userProfile!.username!;
    window.IsGameReadOnly = () => !!username;
    window.GetToken = getTokenFromCookies;
    window.GetApiBaseUrl = getApiBaseUrl;

    const unityLoaderScript: HTMLScriptElement =
      document.createElement("script");
    unityLoaderScript.src = "/citybuilder/Build/CityBuilder.loader.js";

    unityLoaderScript.onload = () => {
      if (typeof createUnityInstance !== "undefined") {
        createUnityInstance(
          document.querySelector("#unity-canvas"),
          {
            dataUrl: "/citybuilder/Build/CityBuilder.data.unityweb",
            frameworkUrl:
              "/citybuilder/Build/CityBuilder.framework.js.unityweb",
            codeUrl: "/citybuilder/Build/CityBuilder.wasm.unityweb",
            streamingAssetsUrl: "/citybuilder/StreamingAssets",
            companyName: "Neargami",
            productName: "City",
            productVersion: "0.5.0",
            showBanner: unityShowBanner,
          },
          (progressValue: number) => {
            console.log("Loading progress:", progressValue);
            setProgress(progressValue);
          }
        )
          .then((unityInstance: { Quit: () => Promise<void> } | null) => {
            console.log("Unity loaded");
            unityInstanceRef.current = unityInstance;
            setLoading(false);
          })
          .catch((message: string | null) => {
            console.error("Unity failed to load:", message);
            setError(message);
            setLoading(false);
          });
      } else {
        console.error("createUnityInstance is not defined");
        setError("Unity instance creation failed.");
        setLoading(false);
      }
    };

    unityLoaderScript.onerror = () => {
      console.error("Failed to load Unity loader script.");
      setError("Failed to load Unity loader script.");
      setLoading(false);
    };

    document.body.appendChild(unityLoaderScript);
    unityLoaderScriptRef.current = unityLoaderScript;

    return () => {
      if (unityInstanceRef.current !== null) {
        unityInstanceRef.current.Quit().then(() => {
          console.log("Unity instance unloaded");
          unityInstanceRef.current = null;
        });
      }
      if (unityLoaderScriptRef.current) {
        document.body.removeChild(unityLoaderScriptRef.current);
        unityLoaderScriptRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, userProfile?.username]);

  const getTokenFromCookies = (): string | null => {
    const Token: string | null = jwtToken;

    if (!Token) {
      console.error("Token is missing. User may not be logged in.");
      return null;
    }

    return Token;
  };

  const getApiBaseUrl = (): string | null => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      console.error("API_BASE_URL is not defined.");
      return null;
    }

    return apiBaseUrl;
  };

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const response = await getUserProfileByUsername(username);
        setData(response);
        const balanceOfUser = await getBalance();
        setBalance(balanceOfUser);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, setIsLoading]);

  const handleClaims = async () => {
    const ngcs = await getCurrentNgcs();
    if (ngcs.data !== 0) {
      try {
        await claimsNgcs(ngcs.data);
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      }
      Swal.fire({
        icon: "success",
        title: translate("Success"),
        html: `${translate("Your claim has been registered successfully!")}.
          <a href="/privacy-policy">${translate("Privacy Policy")}</a>
          <a href="/legal-disclaimer">${translate("Legal Disclaimer")}</a>.`,
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: translate("Warning"),
        html: `${translate(
          "No points available to claim"
        )}. <a href="/privacy-policy">${translate("Privacy Policy")}</a>.`,
      });
    }
  };

  const unityShowBanner = (msg: string, type: string) => {
    alert(`${type}: ${msg}`);
  };

  const formatAddress = (address: string): string => {
    if (!address) return "";
    if (address.includes(".")) return address;
    if (address.length > 15) {
      return `${address.slice(0, 5)}.....${address.slice(-5)}`;
    }
    return address;
  };

  const handleCopy = () => {
    if (!("address" in data)) {
      console.error("No address to copy.");
      return;
    }

    navigator.clipboard
      .writeText((data as any).address)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 4000);
      })
      .catch((err) => console.error("Failed to copy!", err));
  };

  return {
    balance,
    isCopied,
    loading,
    progress,
    formatAddress,
    handleCopy,
    handleClaims,
  };
};