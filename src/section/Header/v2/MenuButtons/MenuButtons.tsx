"use client";
import ngcIcons from "@/assets/images/brand/Logo/Without-BG/Logo-3-Size/32.png";
import personIcon from "@/assets/images/icons/person.png";
import NGCToken from "../../NGCToken/NGCToken";
import styles from "./MenuButtons.module.css";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "../../MobileMenu/MobileMenu";
import { useState } from "react";
import { MdNotes } from "react-icons/md";

export default function MenuButtons() {
  const [isMobileMenu, setMobileMenu] = useState<boolean>(false);

  const handleMobileMenu = () => {
    console.log("3213213");
    setMobileMenu(!isMobileMenu);
  };

  return (
    <div>
      <div className={styles.gamfiMenuBtns}>
        <button className={styles.menuBtn} onClick={() => handleMobileMenu()}>
          <MdNotes />
        </button>
        <Link href="/profile">
          <div className={styles.walletBtn}>
            <Image src={ngcIcons} width={25} alt="icon" />
            <NGCToken /> NGC
          </div>
        </Link>
        <div className={styles.profileBtn}>
          <Link href="/profile">
            <Image src={personIcon} width={35} alt="" />
          </Link>
        </div>
      </div>
      {isMobileMenu && <MobileMenu mobileMenuhandle={handleMobileMenu} />}
    </div>
  );
}
