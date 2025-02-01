"use client";

import { ScrollArea } from "@mantine/core";

import { UserButton } from "@/components/UserButton/UserButton";
import type { NavItem } from "@/interfaces/nav-item";
import { NavLinksGroup } from "./NavLinksGroup";
import classes from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/apiService";
import { UserProfileResponse } from "@/interfaces/api";
import userDefault from "@/assets/images/no-User.png";

interface Props {
  data: NavItem[];
  hidden?: boolean;
}

export function Navbar({ data }: Props) {

  const links = data.map((item) => (
    <NavLinksGroup key={item.label} {...item} />
  ));

  const [user, setUser] = useState<UserProfileResponse | null>(null);

    useEffect(() => {
      const fetchPlayers = async () => {
        try {
          const users = await getUserProfile();
          setUser(users);
        } catch (error) {
          console.error("Error fetching players:", error);
        }
      };
          fetchPlayers();
    }, []);

  return (
    <>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton

          image={user ? user.image : userDefault.src}
          name={user ? `${user.firstname} ${user.lastname}` : "Loading..."}
          email={user ? user.email : "loading..."}
        />
      </div>
    </>
  );
}
