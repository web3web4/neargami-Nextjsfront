import logo from "@/assets/images/brand/Logo/Without-BG/Logo-5.png";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

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
