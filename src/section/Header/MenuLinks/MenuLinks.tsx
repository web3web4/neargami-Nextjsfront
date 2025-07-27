"use client";
import { useHeader } from "@/hooks/useHeader";
import styles from "./MenuLinks.module.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export default function MenuLinks() {
  const [menuId, setMenuId] = useState<string>("");
  const { data, handleMenuClick } = useHeader(setMenuId);
  const translate = useTranslations("Header");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
        {data?.map((menu, i) => (
          <li key={i}>
            {menu.action ? (
              <div className={styles.btnHeader} onClick={menu.onClick} role="button">
                {translate(menu.title)}
              </div>
            ) : (
              <>
                {menu.subMenus && menu.subMenus?.length > 0 ? (
                  <div
                    className={styles.btnHeader}
                    onClick={() => setMenuId((prevId) => (prevId === menu.id ? "" : menu.id))}
                    role="button"
                  >
                    {translate(menu.title)} <MdOutlineKeyboardArrowDown />
                  </div>
                ) : (
                  <div
                    className={styles.btnHeader}
                    onClick={(e) => handleMenuClick(e, menu.url, menu.isNeedAuth)}
                    role="button"
                  >
                    {translate(menu.title)}
                  </div>
                )}
              </>
            )}

            {menu.subMenus && menu.subMenus?.length > 0 && (
              <div
                ref={menuId === menu.id ? dropdownRef : null}
                className={menuId === menu.id ? styles.visiable : ""}
              >
                <ul className={styles.subMenuList}>
                  {menu.subMenus?.map((subMenu, i) => (
                    <li key={i}>
                      {subMenu.action ? (
                        <a>
                          <div onClick={subMenu.onClick} role="button">
                            {translate(subMenu.title)}
                          </div>
                        </a>
                      ) : (
                        <a>
                          <div
                            onClick={(e) =>
                              handleMenuClick(e, subMenu.url, subMenu.isNeedAuth)
                            }
                          >
                            {translate(subMenu.title)}
                          </div>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
