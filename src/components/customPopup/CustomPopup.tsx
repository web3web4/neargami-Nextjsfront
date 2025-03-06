import { ReactNode } from "react";
import styles from "./CustomPopup.module.css";

interface CustomPopupProps {
  children: ReactNode;
  open: boolean;
  closed: (value: boolean) => void;
}

export default function CustomPopup({
  children,
  open,
  closed,
}: CustomPopupProps) {
  return open ? (
      <div className={styles.popup}>
        <div className={styles.popupInner}>
          <div className={styles.closeBtn} onClick={() => closed(false)}>
            x
          </div>
          {children}
        </div>
      </div>
  ) : (
    <></>
  );
}
