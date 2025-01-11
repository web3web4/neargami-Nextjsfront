import Link from "next/link";
import styles from "./Button.module.css";
import { ButtonProps } from "@/interfaces/button";

const Button = ({
  className,
  children,
  href,
  variant,
  size,
  style,
  ...props
}: ButtonProps) => {
  return (
    <div className={styles.container} style={style}>
      <Link
        href={href ? href : "#"}
        style={{ color: "#090B1A" }}
        {...props}
        className={`${styles.btnWrapper} 
        ${variant ? styles[variant] : ""}
        ${size ? styles[size] : styles.sm}
         ${className || ""}`}
      >
        {children}

        <div className={styles.hoverShapeWrapper}>
          <span
            className={`${styles.btnHoverShape} ${styles.btnHoverShape1}`}
          ></span>
          <span
            className={`${styles.btnHoverShape} ${styles.btnHoverShape2}`}
          ></span>
          <span
            className={`${styles.btnHoverShape} ${styles.btnHoverShape3}`}
          ></span>
        </div>
      </Link>
    </div>
  );
};

export default Button;
