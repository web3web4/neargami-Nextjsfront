"use client";
import React, { useEffect, useState } from "react";
import { Rearrange, Button } from "@/components";
import { moveUp, moveDown } from "./index";
import { useTranslations } from "next-intl";
import { extractTextFromHTML } from "@/utils/functions";
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
  const translate = useTranslations("ListManager");

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
            <li data-title={translate("Arrange")}> {col[arrangeFild]} </li>
            <li data-title={translate(mainField)}>
              <div
                className={styles.des}
                dangerouslySetInnerHTML={{
                  __html: extractTextFromHTML(col[mainField]),
                }}
              />
            </li>
            <li data-title={translate("Rearrange")}>
              <Rearrange
                onClickUp={() => moveUp(i, arrangeFild, data, setData)}
                onClickDown={() => moveDown(i, arrangeFild, data, setData)}
              />
            </li>
            <li data-title="">
              <Button variant="mint" size="sm" href={`${href}/${col[idField]}`}>
                {translate("Edit")}
              </Button>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ListManager;
