"use client";
import { MouseEventHandler, useState } from "react";
import { BsXLg } from "react-icons/bs";
import styles from "./MobileMenu.module.css";
import logo from "@/assets/images/brand/Logo/Without-BG/Logo-5.png";
import data from "@/assets/data/menu/menuDataMobile";
import Image from "next/image";
import Link from "next/link";
import { useWallet } from "@/auth/nearAuth";
import Swal from "sweetalert2";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

const MobileMenu = ({
  mobileMenuhandle,
}: {
  mobileMenuhandle: MouseEventHandler<HTMLButtonElement>;
}) => {
  const [menuId, setMenuId] = useState<string>("");
  const { handleNearLogout } = useWallet();
  const { jwtToken } = useAuth();
  const router = useRouter();

  const handleMenuClick = async (
    e: any,
    url: string,
    isNeedAuth: boolean | undefined
  ) => {
    if (!jwtToken && isNeedAuth) {
      e.preventDefault();
      Swal.fire({
        icon: "warning",
        title: "No Token Found",
        text: "Please log in to continue.",
      });
    } else {
      router.push(url);
    }
  };

  return (
    <div className={styles.gamfiMobileMenu}>
      <div className={styles.gamfiMobileMenuContent}>
        <div className={styles.mobileMenuLogo}>
          <Link href="/">
            <Image
              src={logo}
              width={150}
              alt="gamfi nft logo"
              loading="eager"
            />
          </Link>
          <button
            className={styles.mobileMenuCloseBtn}
            onClick={(e) => mobileMenuhandle(e)}
          >
            <BsXLg />
          </button>
        </div>
        <div className={styles.gamfiMobileMenuList}>
          <ul>
            {data?.map((menu, i) => (
              <li
                key={i}
                className={`${
                  menu.subMenus && menu.subMenus?.length > 0
                    ? styles.hasSubMenu
                    : ""
                } ${menuId === menu.id ? styles.expandSubMenu : ""}`}
                onClick={() => setMenuId(menu.id)}
              >
                {menu.action ? (
                  <div className={styles.btnHeader} onClick={handleNearLogout}>
                    {menu.title}
                  </div>
                ) : (
                  <div
                    className={styles.btnHeader}
                    onClick={(e) =>
                      handleMenuClick(e, menu.url, menu.isNeedAuth)
                    }
                  >
                    {menu.title}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
