import styles from "./Menu.module.css";
import MenuButtons from "../../MenuButtons/MenuButtons";
import MenuLinks from "../../MenuLinks/MenuLinks";

export default function Menu() {

  return (
    <div className={styles.gamfiMenuRightSect}>
      <MenuLinks />
      <MenuButtons isShowMenu={true}/>
    </div>
  );
}
