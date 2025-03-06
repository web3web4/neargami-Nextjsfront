import Logo from "../Logo/Logo";
import styles from "./Header.module.css";
import Menu from "./Menu/Menu";

const Header = () => {
  return (
    <div className={styles.gamfiHeader}>
      <div className="container">
        <div className={styles.gamfiMenuSect}>
          <Logo />
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Header;
