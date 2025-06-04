"use client";

import Image from "next/image";
import styles from "./Banner.module.css";
import bannerIcon from "@/assets/images/brand/Logo/Without-BG/Logo-6.png";
import { useTranslations } from "next-intl";
import { FiChevronDown } from "react-icons/fi";
import { useSpeedLines } from "@/components/SpeedLines/ClientSpeedLines";

const Banner = () => {
  const translate = useTranslations("Banner");
  const { activateSpeedLines } = useSpeedLines();
  
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    activateSpeedLines();
    
    setTimeout(() => {
      const coursesSection = document.getElementById('courses-list');
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

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
          <a 
            href="#courses-list" 
            className={styles.scrollButton} 
            aria-label="Scroll to courses"
            onClick={handleScroll}
          >
            <FiChevronDown size={28} style={{ strokeWidth: 3 }} />
            <span>Start Learn</span>
            <FiChevronDown size={28} style={{ strokeWidth: 3 }} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
