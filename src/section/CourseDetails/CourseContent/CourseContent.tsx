import styles from "./CourseContent.module.css";

export default function CourseContent({ content }: { content: string }) {
  return (
    <div className={styles.courseContentWrapper}>
      <div className={`${styles.main} container`}>
        <div
          className={`${content !== "" ? styles.content : ""}`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
