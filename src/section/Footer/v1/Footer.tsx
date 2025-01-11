import styles from "./footer.module.css";
import FooterBottom from "../FooterBottom/v1/FooterBottom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <FooterBottom />
    </footer>
  );
};

export default Footer;
