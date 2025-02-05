import { MenuItem } from "@/interfaces/menu";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useWallet } from "@/auth/nearAuth";
import { Dispatch, SetStateAction } from "react";

export const useHeader = (setMenuId: Dispatch<SetStateAction<string>>) => {
  const route = useRouter();
  const { handleNearLogout } = useWallet();

  const data: MenuItem[] = [
    {
      id: "1W1WV",
      title: "All Courses",
      url: "/",
      isNeedAuth: false,
    },
    {
      id: "1W2WV",
      title: "Players",
      url: "/players",
      isNeedAuth: false,
      subMenus: [
        {
          id: "1W3WV",
          title: "Leader Board",
          url: "/leader-board",
          isNeedAuth: false,
        },
      ],
    },
    {
      id: "1W4WV",
      title: "Teacher Dashboard",
      url: "/teacher-dashboard",
      isNeedAuth: true,
    },
    {
      id: "1W5WV",
      title: "Disconnect",
      url: "",
      action: true,
      onClick: () => handleNearLogout(),
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

  return {
    data,
    mobileData,
  };
};
