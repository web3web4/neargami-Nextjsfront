"use client";
import { useHeader } from "@/hooks/useHeader";
import styles from "./MenuLinks.module.css";
import Link from "next/link";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useTranslations } from "next-intl";
import { Fragment, useState } from "react";

export default function MenuLinks() {
  const [menuId, setMenuId] = useState<string>("");
  const { data, handleMenuClick } = useHeader(setMenuId);
  const translate = useTranslations("Header");

  return (
    <div className={styles.gamfiMenuList}>
      <ul>
        {data?.map((menu, i) => (
          <li key={i}>
            {menu.action ? (
              <div className={styles.btnHeader} onClick={menu.onClick}>
                {translate(menu.title)}
              </div>
            ) : (
              <Fragment>
                {menu.subMenus && menu.subMenus?.length > 0 ? (
                  <div
                  className={styles.btnHeader}
                  onClick={() => setMenuId((prevId) => (prevId === menu.id ? "" : menu.id))}
                >
                  {translate(menu.title)}{" "}
                  <MdOutlineKeyboardArrowDown />

                </div>
                ) : <div
                className={styles.btnHeader}
                onClick={(e) => handleMenuClick(e, menu.url, menu.isNeedAuth)}
              >
                {translate(menu.title)}{" "}
              </div>}
              </Fragment>
            )}

            {menu.subMenus && menu.subMenus?.length > 0 && (
              <div className={menuId === menu.id ? styles.visiable : ""}>
                <ul className={styles.subMenuList}>
                  {menu.subMenus?.map((subMenu, i) => (
                    <li key={i}>
                      {subMenu.action ? (
                        <a>
                          {" "}
                          <div onClick={subMenu.onClick}>
                            {translate(subMenu.title)}{" "}
                          </div>
                        </a>
                      ) : (
                        <Link href={subMenu.url}>
                          {translate(subMenu.title)}
                        </Link>
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
