"use client";
import { useHeader } from "@/hooks/useHeader";
import styles from "./MenuLinks.module.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/authContext";

export default function MenuLinks() {
  const [menuId, setMenuId] = useState<string>("");
  const { data, handleMenuClick } = useHeader(setMenuId);
  const translate = useTranslations("Header");
  const dropdownRef = useRef<HTMLLIElement | null>(null);
  const { jwtToken } = useAuth();


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuId("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.gamfiMenuList}>
      <ul>
        {data?.map((menu, i) => {
          const isOpen = menuId === menu.id;

          return (
            <li key={i} ref={isOpen ? dropdownRef : null}>
              {menu.action ? (
                <div
                  className={styles.btnHeader}
                  onClick={menu.onClick}
                  role="button"
                >
                  {translate(menu.title)}
                </div>
              ) : (
                <>
                  {menu.subMenus && menu.subMenus?.length > 0 ? (
                    <div
                      className={styles.btnHeader}
                      onClick={() =>
                        setMenuId((prevId) =>
                          prevId === menu.id ? "" : menu.id
                        )
                      }
                      role="button"
                    >
                      {translate(menu.title)} <MdOutlineKeyboardArrowDown />
                    </div>
                  ) : (
                    <Link
                      href={menu.url}
                      onClick={(e) => {
                        if (!jwtToken && menu.isNeedAuth) {
                          e.preventDefault();
                          handleMenuClick(e, menu.url, menu.isNeedAuth);
                        }
                      }}
                    >
                      <div className={styles.btnHeader} role="button">
                        {translate(menu.title)}
                      </div>
                    </Link>
                  )}
                </>
              )}

              {menu.subMenus && menu.subMenus?.length > 0 && (
                <div className={isOpen ? styles.visiable : ""}>
                  <ul className={styles.subMenuList}>
                    {menu.subMenus?.map((subMenu, j) => (
                      <li key={j}>
                        {subMenu.action ? (
                          <div onClick={subMenu.onClick} className={styles.btnSubMenu} role="button">
                            {translate(subMenu.title)}
                          </div>
                        ) : (
                          <Link
                            href={subMenu.url}
                            onClick={(e) => {
                              if (!jwtToken && subMenu.isNeedAuth) {
                                e.preventDefault();
                                handleMenuClick(e, subMenu.url, subMenu.isNeedAuth);
                              }
                            }}
                          >
                            <div role="button">
                              {translate(subMenu.title)}
                            </div>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
