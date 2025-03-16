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

export default function MenuButtons({ isShowMenu }: { isShowMenu: boolean }) {
  const translate = useTranslations("Header");
  const [buttonText, setButtonText] = useState<string>("Connect");
  const [isMobileMenu, setMobileMenu] = useState<boolean>(false);
  const { handleNearLogin } = useWallet();
  const { userProfile, jwtToken } = useAuth();

  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
  };

  return (
    <div className={styles.gamfiMenuBtns}>
      {isShowMenu && (
        <button className={styles.menuBtn} onClick={() => handleMobileMenu()}>
          <MdNotes />
        </button>
      )}

      {jwtToken ? (
        <>
          <Link href="/profile">
            <div className={styles.walletBtn}>
              <Image src={ngcIcons} width={25} alt="icon" />
              <NGCToken /> NGC
            </div>
          </Link>
          {/* <Image src={notificationIcon} width={35} alt="" /> */}
          <Link href="/profile">
            <div className={styles.profileBtn}>
              <Image
                src={userProfile?.image || personIcon.src}
                alt="player-image"
                width={45}
                height={45}
                loading={"lazy"}
                className={styles.playerImage}
                onError={() => personIcon.src}
              />
            </div>
          </Link>
        </>
      ) : (
        <Button
          href="# "
          variant="white"
          onClick={() => handleNearLogin(setButtonText)}
        >
          <Image src={connectIcon} alt="icon" />
          {translate(buttonText)}
        </Button>
      )}
      {isMobileMenu && <MobileMenu mobileMenuhandle={handleMobileMenu} />}
    </div>
  );
}
