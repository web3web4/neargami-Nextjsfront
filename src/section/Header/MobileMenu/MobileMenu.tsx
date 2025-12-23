"use client";
import { MouseEventHandler, useState } from "react";
import { BsXLg } from "react-icons/bs";
import logo from "@/assets/images/brand/Logo/Without-BG/Logo-5.png";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useHeader } from "@/hooks/useHeader";
import styles from "./MobileMenu.module.css";

const MobileMenu = ({
  mobileMenuhandle,
}: {
  mobileMenuhandle: MouseEventHandler<HTMLButtonElement>;
}) => {
  const [menuId, setMenuId] = useState<string>("");
  const { mobileData, handleMenuClick } = useHeader(setMenuId);
  const translate = useTranslations("Header");

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
                    <div onClick={menu.onClick}>{translate(menu.title)}</div>
                  ) : menu.subMenus && menu.subMenus.length > 0 ? (
                    <div className={styles.btnHasChild}
                      onClick={() =>
                        setMenuId((prevId) =>
                          prevId === menu.id ? "" : menu.id
                        )
                      }
                    >
                      <div>{translate(menu.title)}</div>
                      <div>
                        {menu.subMenus && menu.subMenus.length > 0
                          ? menuId === menu.id
                            ? "-"
                            : "+"
                          : ""}
                      </div>
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
