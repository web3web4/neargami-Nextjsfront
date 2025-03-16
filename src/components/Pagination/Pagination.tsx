"use client";

import { useRouter } from "next/navigation";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  pageCount:number;
}

const Pagination = ({ currentPage , pageCount }: PaginationProps) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`/players?page=${page}`);
  };

  const renderPageNumbers = () => {
    const totalPages = pageCount; 
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`${styles.pageNumber} ${i === currentPage ? styles.active : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return <div className={styles.paginationContainer}>{renderPageNumbers()}</div>;
};

export default Pagination;
