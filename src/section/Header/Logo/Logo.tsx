import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/brand/Logo/Without-BG/Logo-5.png";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={styles.gamfiMenuLeftSect}>
      <div className={styles.logo}>
        <Link prefetch={true} href="/">
          <Image src={logo} alt="gamfi nft logo" />
        </Link>
      </div>
    </div>
  );
}
