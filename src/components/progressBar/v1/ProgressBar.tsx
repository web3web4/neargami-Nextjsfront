import styles from "./ProgressBar.module.css";

const ProgressBar = ({ progress }: { progress: string }) => {
  return (
    <div className={styles.progressBarWrapper} >
      <div className={styles.progressBar}>
        <span
          className={styles.progressBarOverlay}
          style={{ width: progress ? progress : "50%" }}
        ></span>
      </div>
    </div>
  );
};

export default ProgressBar;