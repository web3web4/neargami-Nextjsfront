"use client";

import { SimpleTable } from "@/components/Table/SimpleTable";
import {
   CoursesResponse,
   //DataPopup 
  } from "@/interfaces/api";
import {
  columns,
  handelStatusHistory,
  handleApprove,
  //handleDelete,
  handleReject,
  handleUnPublish,
  handleView,
} from "./useManageCoursesDashbiard";
import { MRT_Row } from "mantine-react-table";
import { useState } from "react";
import PlayerListPopup from "@/components/PlayerListPopup/PlayerListPopup";

interface CourseList {
  data: CoursesResponse[];
}

export default function ManageCourses({ data }: CourseList) {
  const [courseData, setCourseData] = useState<CoursesResponse[]>(data);
  const [showStartPopup, setShowStartPopup] = useState<boolean>(false);
  const [popupStatusHistory, setPopupStatusHistory] = useState<CoursesResponse[]>(data);

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
      { label: "Status History", color: "yellow", onClick: (rowIndex: number) => handelStatusHistory(rowIndex, courseData, setPopupStatusHistory, setShowStartPopup) },
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
    } else if (status === "APPROVED"){
      baseActions.push({
        label: "UnPublish",
        color: "red", 
        onClick: (rowIndex: number) => handleUnPublish(rowIndex, courseData, setCourseData),
      })
    }

    return baseActions;
  };

  return (
    <>
    
      <PlayerListPopup
        open={showStartPopup}
        onClose={() => setShowStartPopup(false)}
        title="Status History"
        fetchSatusHistory={popupStatusHistory} 
        fetchPlayers={null}      
      />
      
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
