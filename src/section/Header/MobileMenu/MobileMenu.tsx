"use client";
import { MouseEventHandler, useState } from "react";
import { BsXLg } from "react-icons/bs";
import styles from "./MobileMenu.module.css";
import logo from "@/assets/images/brand/Logo/Without-BG/Logo-5.png";
import data from "@/assets/data/menu/menuDataMobile";
import Image from "next/image";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import { useWallet } from "@/auth/nearAuth";

const MobileMenu = ({
  mobileMenuhandle,
}: {
  mobileMenuhandle: MouseEventHandler<HTMLButtonElement>;
}) => {
  const [menuId, setMenuId] = useState<string>("");
  const { handleNearLogout } = useWallet();

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
                  <Link href={menu.url as Url}>{menu.title}</Link>
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
