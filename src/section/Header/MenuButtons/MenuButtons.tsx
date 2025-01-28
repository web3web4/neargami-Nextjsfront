"use client";
import connectIcon from "@/assets/images/icons/connect.png";
import personIcon from "@/assets/images/icons/person.png";
import ngcIcons from "@/assets/images/brand/Logo/Without-BG/Logo-3-Size/32.png";
import Button from "@/components/button/Button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useWallet } from "@/auth/nearAuth";
import { useAuth } from "@/context/authContext";
import { MdNotes } from "react-icons/md";
import styles from "./MenuButtons.module.css";
import NGCToken from "@/section/Header/NGCToken/NGCToken";
import MobileMenu from "@/section/Header/MobileMenu/MobileMenu";
import { useTranslations } from "next-intl";

export default function MenuButtons() {
  const translate = useTranslations("Header");
  const [buttonText, setButtonText] = useState<string>(translate("Connect"));
  const [isMobileMenu, setMobileMenu] = useState<boolean>(false);
  const { handleNearLogin } = useWallet();
  const { jwtToken } = useAuth();
  

  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
  };

  return (
    <div className={styles.gamfiMenuBtns}>
      <button className={styles.menuBtn} onClick={() => handleMobileMenu()}>
        <MdNotes />
      </button>
      {jwtToken ? (
        <>
          <Link href="/profile">
            <div className={styles.walletBtn}>
              <Image src={ngcIcons} width={25} alt="icon" />
              <NGCToken /> NGC
            </div>
          </Link>
          {/* <Image src={notificationIcon} width={35} alt="" /> */}
          <div className={styles.profileBtn}>
            <Link href="/profile">
              <Image src={personIcon} width={35} alt="" />
            </Link>
          </div>
        </>
      ) : (
        <Button
          href="# "
          variant="white"
          onClick={() => handleNearLogin(setButtonText)}
        >
          <Image src={connectIcon} alt="icon" />
          {buttonText}
        </Button>
      )}
      {isMobileMenu && <MobileMenu mobileMenuhandle={handleMobileMenu} />}
    </div>
  );
}
