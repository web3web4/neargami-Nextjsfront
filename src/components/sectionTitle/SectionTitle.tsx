import styles from "./SectionTitle.module.css";
import sectionTitleShapeRight from "@/assets/images/icons/steps.png";
import sectionTitleShapeLeft from "@/assets/images/icons/steps2.png";
import Image from "next/image";
import { ReactNode } from "react";

interface SectionTitleProps {
  title?: string;
  subtitle?: string;
  isCenter?: boolean;
}

export const SectionTitle = ({ title, subtitle, isCenter, ...props }: SectionTitleProps) => {
  return (
    <div {...props} className={styles.section_title}>
      {subtitle && (
        <span className={styles.subtitle}>
          {isCenter && (
            <Image src={sectionTitleShapeLeft} alt="section title shape" />
          )}
          {subtitle}
          <Image src={sectionTitleShapeRight} alt="section title shape" />
        </span>
      )}
      {title && <h2>{title}</h2>}
    </div>
  );
};

export const SectionTitleWrapper = ({ children }: {children: ReactNode}) => {
  return <div className={styles.section_title_wrapper}>{children}</div>;
};
