"use client";
import Link from "next/link";
import styles from "./Button.module.css";
import { ButtonProps } from "@/interfaces/button";
import { useState } from "react";

const Button = ({
  className,
  children,
  href,
  variant,
  size,
  style,
  ...props
}: ButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const HandleOnClick = async (
    callback: any,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    if (!callback) return;
    setIsLoading(true);
    await callback();
    setIsLoading(false);
  };

  return (
    <div className={styles.container} style={style}>
      <Link
        href={href ? href : "#"}
        style={{ color: "#090B1A" }}
        {...props}
        onClick={(e) => HandleOnClick(props.onClick, e)}
        className={`${styles.btnWrapper} 
        ${variant ? styles[variant] : ""} 
        ${size ? styles[size] : styles.sm} 
        ${className || ""}`}
      >
        {isLoading ? <span className={styles.loader}></span> : children}

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
