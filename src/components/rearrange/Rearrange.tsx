import React from "react";
import styles from "./Rearrange.module.css";

interface RearrangeProps {
  onClickUp: () => Promise<void>;
  onClickDown: () => Promise<void>;
}

const Rearrange = ({ onClickUp, onClickDown }: RearrangeProps) => {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <button className={styles.buttonStyle} type="button" onClick={onClickUp}>
        <div className={styles.upArrowStyle}></div>
      </button>
      <button
        className={styles.buttonStyle}
        type="button"
        onClick={onClickDown}
      >
        <div className={styles.downArrowStyle}></div>
      </button>
    </div>
  );
};

export default Rearrange;
