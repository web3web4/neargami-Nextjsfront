import logo from "@/assets/images/brand/Logo/Without-BG/Logo-5.png";
import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div className={`${styles.navWrapper} ${styles.gamfiHeader}`}>
      <div className="container">
        <div className={styles.logo}>
          <Link href="/">
            <Image src={logo} width={100} height={20} alt="gamfi nft logo" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
