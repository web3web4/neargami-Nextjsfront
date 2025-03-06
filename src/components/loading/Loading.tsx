import React from "react";
import styles from "./Loading.module.css";
import logo from "@/assets/images/brand/Logo/Without-BG/Logo-3.png";
import house from "@/assets/images/house.png";
import road from "@/assets/images/road.png";
import tree from "@/assets/images/tree.png";
import Image from "next/image";

export default function Loading() {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.logosContainer}>
        <Image src={logo} alt="Central Logo" className={styles.centralLogo} />
        <Image
          src={house}
          alt="Logo 1"
          className={`${styles.logo} ${styles.logo1}`}
        />
        <Image
          src={road}
          alt="Logo 2"
          className={`${styles.logo} ${styles.logo2}`}
        />
        <Image
          src={tree}
          alt="Logo 3"
          className={`${styles.logo} ${styles.logo3}`}
        />
      </div>
    </div>
  );
}
