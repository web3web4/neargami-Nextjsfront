import styles from "./Header.module.css";
import Logo from "../Logo/Logo";
import MenuLinks from "../MenuLinks/MenuLinks";
import MenuButtons from "../MenuButtons/MenuButtons";

const Header = () => {
  return (
    <div className={styles.navWrapper}>
      <div className={styles.gamfiHeader}>
        <div className="container">
          <div className={styles.gamfiMenuSect}>
            <Logo />
            <div className={styles.gamfiMenuRightSect}>
              <MenuLinks />
              <MenuButtons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
