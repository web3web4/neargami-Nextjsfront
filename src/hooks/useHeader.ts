import { MenuItem } from "@/interfaces/menu";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useWallet } from "@/auth/nearAuth";
import { Dispatch, SetStateAction } from "react";
import Swal from "sweetalert2";
import { useAuth } from "@/context/authContext";
import { useTranslations } from "next-intl";

export const useHeader = (setMenuId: Dispatch<SetStateAction<string>>) => {
  const route = useRouter();
  const { handleNearLogout } = useWallet();
  const translate = useTranslations("messages");
  const { jwtToken } = useAuth();

  const { authMethod } = useAuth();

  const data: MenuItem[] = [
    {
      id: "1W1WV",
      title: "Courses",
      url: "/",
      isNeedAuth: false,
    },
    {
      id: "1W80WV",
      title: "Explore",
      url: "",
      isNeedAuth: false,
      subMenus: [
        {
          id: "1W81WV2",
          title: "my Courses",
          url: "/my-course",
          isNeedAuth: true,
        },
        {
          id: "1W4WV",
          title: "Teach",
          url: "/teacher-dashboard",
          isNeedAuth: true,
        },
        {
          id: "1W2WV2",
          title: "Players",
          url: "/players",
          isNeedAuth: false,
        },
        {
          id: "1W2WV1",
          title: "Leader Board",
          url: "/leader-board",
          isNeedAuth: false,
        },
      ],
    },
    {
      id: "1W8WV",
      title: "Company",
      url: "",
      isNeedAuth: false,
      subMenus: [
        {
          id: "1W8WV2",
          title: "Contact",
          url: "/contact",
          isNeedAuth: false,
        },
        {
          id: "1W8WV1",
          title: "About",
          url: "/about",
          isNeedAuth: false,
        },
      ],
    },
    {
      id: "1W7WV",
      title: "Language",
      url: "",
      subMenus: [
        {
          id: "1W7WV1",
          title: "Arabic",
          url: "",
          isNeedAuth: false,
          action: true,
          onClick: () => handleChangeLanguage("ar"),
        },
        {
          id: "1W7WV2",
          title: "English",
          url: "",
          isNeedAuth: false,
          action: true,
          onClick: () => handleChangeLanguage("en"),
        },
      ],
    },
  ];

   //Check If Connect And Disconnect 
   if(jwtToken && authMethod === "NEAR"){
    data.push(
      {
        id: "1W5WV",
        title: "Disconnect",
        url: "",
        action: true,
        onClick: () => handleNearLogout(),
      },
    )
  }

  const mobileData: MenuItem[] = [
    {
      id: "1W5WV",
      title: "Profile",
      url: "/profile",
      isNeedAuth: true,
    },
    ...data,
  ];

  const handleChangeLanguage = (lang: string) => {
    setCookie("language", lang);
    setMenuId("");
    route.refresh();
  };

  const handleMenuClick = async (
    e: any,
    url: string,
    isNeedAuth: boolean | undefined
  ) => {
    if (!jwtToken && isNeedAuth) {
      e.preventDefault();
      Swal.fire({
        icon: "warning",
        title: translate("Warning"),
        text: translate("Please log in to continue"),
      });
    } else {
      route.push(url);
    }
  };

  return {
    data,
    mobileData,
    handleMenuClick,
  };
};
