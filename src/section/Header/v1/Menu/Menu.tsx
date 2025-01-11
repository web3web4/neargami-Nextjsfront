"use client";
import { useAuth } from "@/context/authContext";
import styles from "./Menu.module.css";
import MenuButtons from "./MenuButtons/MenuButtons";
import MenuLinks from "../../MenuLinks/MenuLinks";

export default function Menu() {
  const { jwtToken } = useAuth();

  return (
    <div className={styles.gamfiMenuRightSect}>
      {jwtToken && <MenuLinks />}
      <MenuButtons />
    </div>
  );
}
