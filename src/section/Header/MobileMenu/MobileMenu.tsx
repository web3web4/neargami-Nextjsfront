"use client";
import { MouseEventHandler, useState } from "react";
import { BsXLg } from "react-icons/bs";
import styles from "./MobileMenu.module.css";
import logo from "@/assets/images/brand/Logo/Without-BG/Logo-5.png";
import Image from "next/image";
import Link from "next/link";
import { useWallet } from "@/auth/nearAuth";
import Swal from "sweetalert2";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useHeader } from "@/hooks/useHeader";

const MobileMenu = ({
  mobileMenuhandle,
}: {
  mobileMenuhandle: MouseEventHandler<HTMLButtonElement>;
}) => {
  const [menuId, setMenuId] = useState<string>("");
  const {mobileData} = useHeader(setMenuId);
  const { handleNearLogout } = useWallet();
  const { jwtToken } = useAuth();
  const router = useRouter();
  const translate = useTranslations("Header");

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
            {mobileData?.map((menu, i) => (
              <li
                key={i}
                className={`${menuId === menu.id ? styles.expandSubMenu : ""}`}
              >
                <div className={styles.btnHeader}>
                  {menu.action ? (
                    <div onClick={handleNearLogout}>
                      {translate(menu.title)}
                    </div>
                  ) : (
                    <div
                      onClick={(e) =>
                        handleMenuClick(e, menu.url, menu.isNeedAuth)
                      }
                    >
                      {translate(menu.title)}
                    </div>
                  )}
                  <div
                    onClick={() =>
                      setMenuId((prevId) => (prevId === menu.id ? "" : menu.id))
                    }
                  >
                    {menu.subMenus && menu.subMenus.length > 0
                      ? menuId === menu.id
                        ? "-"
                        : "+"
                      : ""}
                  </div>
                </div>
                {menu.subMenus && menu.subMenus.length > 0 && (
                  <ul className={styles.subMenuList}>
                    {menu.subMenus?.map((subMenu, i) => (
                      <li key={i}>
                        {subMenu.action ? (
                          <div onClick={subMenu.onClick}>
                            {translate(subMenu.title)}
                          </div>
                        ) : (
                          <div
                            onClick={(e) =>
                              handleMenuClick(
                                e,
                                subMenu.url,
                                subMenu.isNeedAuth
                              )
                            }
                          >
                            {translate(subMenu.title)}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
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
