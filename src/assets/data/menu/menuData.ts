//import { useWallet } from "@/auth/nearAuth";
//import React from "react";

//const { handleNearLogout  } = useWallet();

interface MenuItem {
  id: string;
  title: string;
  url: string;
  action?: boolean;
  subMenus?: MenuItem[];
  subMenuChilds?:string[];
}

export const data: MenuItem[] = [
  {
    id: "1W1WV",
    title: "All Courses",
    url: "/",
  },
  {
    id: "1W2WV",
    title: "Players",
    url: "/players",
  },
  {
    id: "1W3WV",
    title: "Leader Board",
    url: "/leader-board",
  },
  {
    id: "1W4WV",
    title: "Teacher Dashboard",
    url: "/teacher-dashboard",
  },
  {
    id: "1W5WV",
    title: "Disconnect",
    url: "",
    action: true,
  },
];

