"use client";
import { data } from "@/assets/data/menu/menuData";
import { useWallet } from "@/auth/nearAuth";
import styles from "./MenuLinks.module.css";
import Link from "next/link";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useAuth } from "@/context/authContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function MenuLinks() {
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
    <div className={styles.gamfiMenuList}>
      <ul>
        {data?.map((menu, i) => (
          <li key={i}>
            {menu.action ? (
              <div className={styles.btnHeader} onClick={handleNearLogout}>
                {translate(menu.title)}
              </div>
            ) : (
              <div
                className={styles.btnHeader}
                onClick={(e) => handleMenuClick(e, menu.url, menu.isNeedAuth)}
              >
                {translate(menu.title)}{" "}
                {menu.subMenus && menu.subMenus?.length > 0 && (
                  <MdOutlineKeyboardArrowDown />
                )}
              </div>
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
