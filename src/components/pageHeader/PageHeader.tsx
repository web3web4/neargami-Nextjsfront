import styles from "./PageHeader.module.css";
import titleShape from "@/assets/images/icons/steps.png";
import shareIcon from "@/assets/images/icons/shareIcon.png";
import Link from "next/link";
import React from "react";
import Image from "next/image";

interface PageHeaderProps {
  currentPage: string;
  pageTitle: string;
  isShowShareIcon?: boolean;
  style?: React.CSSProperties;
}

const PageHeader = ({
  currentPage,
  pageTitle,
  isShowShareIcon,
  style,
}: PageHeaderProps) => {
  return (
    <div className={styles.pageHeaderWrapper} style={style}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className={styles.breadcrumbArea}>
              <div className={styles.breadcrumbMenu}>
                <>
                  <Link href="/">Home</Link> <span>.</span>{" "}
                  {currentPage && currentPage}
                </>
                <Image src={titleShape} alt="bithu nft heading shape" />
              </div>
              <h2 className={`${styles.breadcrumbTitle} text-uppercase`}>
                {pageTitle && pageTitle}
              </h2>
            </div>
          </div>
          {isShowShareIcon && (
            <div className="col-lg-7">
              <div className={styles.share}>
                <Link href="#">
                  <Image src={shareIcon} width={20} alt="" />
                  <span>SHARE</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
