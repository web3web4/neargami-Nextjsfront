"use client";
import React, { useEffect, useState } from "react";
import Rearrange from "@/components/rearrange/Rearrange";
import Button from "../button/Button";
import { moveUp, moveDown } from "./index";
import styles from "./ListManager.module.css";

interface ListManagerProps {
  initialData: any;
  mainField: string;
  href: string;
  idField: string;
  arrangeFild: string;
}

const ListManager = ({
  initialData,
  mainField,
  href,
  idField,
  arrangeFild,
}: ListManagerProps) => {
  const [data, setData] = useState(initialData);
  const extractTextFromHTML = (htmlString: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  useEffect(() => {
    const sortedData = [...initialData].sort(
      (a, b) => a[arrangeFild] - b[arrangeFild]
    );
    setData(sortedData);
  }, [initialData, arrangeFild]);

  /**
   * send data lesson to backend and create
   */

  

  return (
    <div className={styles.listManagerWrapper}>
      <div className={styles.listManager}>
        {data?.map((col: any, i: number) => (
          <ul key={i} className={styles.listManagerItem}>
            <li data-title="Arrange"> {col[arrangeFild]} </li>
            <li data-title={mainField}>
              <div
                className={styles.des}
                dangerouslySetInnerHTML={{
                  __html: extractTextFromHTML(col[mainField]),
                }}
              />
            </li>
            <li data-title="Rearrange">
              <Rearrange
                onClickUp={() =>
                  moveUp(i, arrangeFild, data, setData)
                }
                onClickDown={() =>
                  moveDown(i, arrangeFild, data, setData)
                }
              />
            </li>
            <li data-title="">
              <Button variant="mint" size="sm" href={`${href}/${col[idField]}`}>
                Edit
              </Button>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ListManager;
