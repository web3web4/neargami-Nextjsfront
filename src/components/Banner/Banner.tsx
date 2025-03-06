import Image from "next/image";
import styles from "./Banner.module.css";
import bannerIcon from "@/assets/images/brand/Logo/Without-BG/Logo-6.png";
import { useTranslations } from "next-intl";

const Banner = () => {
  const translate = useTranslations("Banner");

  return (
    <div className={styles.bannerWrapper}>
      <div className="container">
        <div className={`${styles.bannerContent} text-center`}>
          <Image
            width={350}
            height={350}
            src={bannerIcon}
            className={styles.bannerIcon}
            alt="banner icon"
            loading="eager"
          />
          <h1 className={styles.bannerTitle}>
            {translate("Gamified e-learning platform")}
            <br />
          </h1>
          <div className={styles.description}>
            {translate("focusing on NEAR and blockchain agnostic technologies")}
          </div>
          <div className={styles.description}>
            {translate("Play to learn & learn to earn")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
