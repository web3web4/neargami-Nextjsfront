"use client";

import { SimpleTable } from "@/components/Table/SimpleTable";
import { CoursesResponse } from "@/interfaces/api";
import {
  columns,
  handleApprove,
  //handleDelete,
  handleReject,
  handleView,
} from "./useManageCoursesDashbiard";
import { MRT_Row } from "mantine-react-table";
import { useState } from "react";

interface CourseList {
  data: CoursesResponse[];
}

export default function ManageCourses({ data }: CourseList) {
  const [courseData, setCourseData] = useState<CoursesResponse[]>(data);

  // Actions for table rows
  const getActions = (row: MRT_Row<any>) => {
    const status = row.original.publish_status;

    const baseActions = [
      /*
      {
        label: "Delete",
        color: "orange",
        onClick: (rowIndex: number) => handleDelete(rowIndex, courseData, setCourseData),
      },
      */
      { label: "View", color: "black", onClick: (rowIndex: number) => handleView(rowIndex, courseData) },
    ];

    if (status === "DRAFT") {
      baseActions.push({
        label: "Approve",
        color: "green",
        onClick: (rowIndex: number) => handleApprove(rowIndex, courseData, setCourseData),
      });
      baseActions.push({
        label: "Reject",
        color: "red",
        onClick: (rowIndex: number) => handleReject(rowIndex, courseData, setCourseData),
      });
    } else if (status === "REJECTED") {
      baseActions.push({
        label: "Approve",
        color: "green",
        onClick: (rowIndex: number) => handleApprove(rowIndex, courseData, setCourseData),
      });
    }

    return baseActions;
  };

  return (
    <>
      <SimpleTable
        columns={columns}
        data={courseData}
        title="Courses Table"
        enableRowAction={true}
        getActions={getActions}
      />
    </>
  );
}
