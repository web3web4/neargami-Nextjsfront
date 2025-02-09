import Header from "./Header/Header";
import styles from "./CourseContent.module.css";

export default function CourseContent({ data, warningMessage }: { data: string, warningMessage: string | null }) {
  return (
    <div>
      <Header />
      <div className={styles.contentLeft}>
        <div
          dangerouslySetInnerHTML={{
            __html: data,
          }}
        />
        {warningMessage && (
          <h1 className={styles.warningMessage}>{warningMessage}</h1>
        )}
      </div>
    </div>
  );
}
