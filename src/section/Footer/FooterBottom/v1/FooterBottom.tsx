import Social from "../../SocialProfile/SocialProfile";
import footerLogo from "@/assets/images/brand/Logo/Without-BG/Logo-5.png";
import { VscChevronUp } from "react-icons/vsc";
import styles from "./FooterBottom.module.css";
import Image from "next/image";

const FooterBottom = () => {
  return (
    <div className={styles.footer_bottom_wrapper}>
      <Social />
      <div className="container">
        <div className={styles.footer_bottom_content}>
          <a href="# " className={styles.footer_logo}>
            <Image src={footerLogo} width={250} alt="footer logo" />
          </a>

          <div className={`${styles.scrollup} text-center`}>
            <a aria-label="Move To Top" href="# ">
              <VscChevronUp />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
