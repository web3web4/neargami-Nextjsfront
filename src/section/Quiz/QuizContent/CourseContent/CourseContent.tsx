import Header from "./Header/Header";
import styles from "./CourseContent.module.css";
import MenuButtons from "@/section/Header/MenuButtons/MenuButtons";
import RenderContent from "@/components/RenderContent/RenderContent";

export default function CourseContent({
  data,
  warningMessage,
}: {
  data: string;
  warningMessage: string | null;
}) {
  return (
    <div>
      <Header />
      <div className={styles.contentLeft}>
        <RenderContent htmlContent={data} className={warningMessage ? styles.truncatedText : ""}/>
        {warningMessage && (
          <div className={styles.warningMessage}>
            <h2>{"\""}{warningMessage}{"\""}</h2>
            <MenuButtons isShowMenu={false}/>
          </div>
        )}
      </div>
    </div>
  );
}
