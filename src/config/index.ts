import {
  //IconComponents,
  IconDashboard,
  IconHome,
  IconSearch,
  //IconLock,
	IconUser,
} from "@tabler/icons-react";
import type { NavItem } from "@/interfaces/nav-item";

export const navLinks: NavItem[] = [
  { label: "Home", icon: IconDashboard, link: "/dashboard" },

  {
    label: "Users",
    icon: IconUser,
    initiallyOpened: false,
    links: [
      {
        label: "Admin",
        icon: IconDashboard,
        link: "/dashboard/users/admin",
      },
      {
        label: "Customers",
        link: "/dashboard/users/customers",
      },
    ],
  },
  /*
  {
    label: "Auth",
    icon: IconLock,
    initiallyOpened: false,
    links: [
      {
        label: "Login",
        link: "/login",
      },
      {
        label: "Register",
        link: "/register",
      },
    ],
  },
  */
  { label: "Keywords Search", icon: IconSearch, link: "/dashboard/keywords" },

  { label: "Go To Front", icon: IconHome, link: "/" },
];
