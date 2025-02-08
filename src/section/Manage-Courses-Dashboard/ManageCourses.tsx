"use client";

import { SimpleTable } from "@/components/Table/SimpleTable";
import { CoursesResponse } from "@/interfaces/api";
import { columns, getActions } from "./useManageCoursesDashbiard";


interface CourseList {
    data:CoursesResponse[];
}

export default function ManageCourses({data} : CourseList)  {

    return (
          <>
            <SimpleTable columns={columns} data={data} title="Courses Table" enableRowAction={true} getActions={getActions}/>
          </>
    );
  };

