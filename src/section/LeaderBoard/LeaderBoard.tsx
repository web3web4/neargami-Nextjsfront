import { useTranslations } from "next-intl";
import styles from "./LeaderBoard.module.css";

const LeaderBoard = () => {
  const translate = useTranslations("LeaderBoard");

  return (
    <div className={styles.main} style={{ height: "350px" }}>
      <h1>{translate("Comming Soon")}</h1>
    </div>
  );
};
export default LeaderBoard;
