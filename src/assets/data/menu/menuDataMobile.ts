import { MenuItem } from "@/interfaces/menu";
// import { handleNearLogout } from "lib/nearhandler";

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
  },
  {
    id: "1W3WV",
    title: "Leader Board",
    url: "/leader-board",
    isNeedAuth: true,
  },
  {
    id: "1W4WV",
    title: "Teacher Dashboard",
    url: "/teacher-dashboard",
    isNeedAuth: true,
  },
  {
    id: "1W5WV",
    title: "Profile",
    url: "/profile",
    isNeedAuth: true,
  },
  {
    id: "1W6WV",
    title: "Disconnect",
    url: "",
    action: true,
  },
];



export default data;
