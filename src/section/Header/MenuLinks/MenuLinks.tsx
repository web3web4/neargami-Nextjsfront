"use client";
import { data } from "@/assets/data/menu/menuData";
import { useWallet } from "@/auth/nearAuth";
import styles from "./MenuLinks.module.css";
import Link from "next/link";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

export default function MenuLinks() {
  const { handleNearLogout } = useWallet();

  return (
    <div className={styles.gamfiMenuList}>
      <ul>
        {data?.map((menu, i) => (
          <li key={i}>
            {menu.action ? (
              <div className={styles.btnHeader} onClick={handleNearLogout}>
                {menu.title}
              </div>
            ) : (
              <Link href={menu.url}>
                {menu.title}{" "}
                {menu.subMenus && menu.subMenus?.length > 0 && (
                  <MdOutlineKeyboardArrowDown />
                )}
              </Link>
            )}

            {menu.subMenus && menu.subMenus?.length > 0 && (
              <ul className={styles.subMenuList}>
                {menu.subMenus?.map((subMenu, i) => (
                  <li key={i}>
                    <Link href={subMenu.url}>
                      {subMenu.title}
                      {subMenu?.subMenuChilds &&
                        subMenu?.subMenuChilds?.length > 0 && (
                          <MdOutlineKeyboardArrowRight />
                        )}
                    </Link>
                    {subMenu?.subMenuChilds &&
                      subMenu?.subMenuChilds?.length > 0 && (
                        <ul className={styles.subMenuChildList}>
                          {subMenu?.subMenuChilds?.map((subChild, i) => (
                            <li key={i}>
                              {/* <Link href={subChild.url}>
                                      {subChild.title}
                                    </Link> */}
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
