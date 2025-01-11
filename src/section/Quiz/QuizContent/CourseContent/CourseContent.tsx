import Header from "./Header/Header";
import styles from "./CourseContent.module.css";

export default function CourseContent({ data }: { data: string }) {
  return (
    <div>
      <Header />
      <div className={styles.contentLeft}>
        <div
          dangerouslySetInnerHTML={{
            __html: data,
          }}
        />
      </div>
    </div>
  );
}
