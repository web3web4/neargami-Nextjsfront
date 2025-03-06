"use client";

import { SimpleTable } from "@/components/Table/SimpleTable";
import { LogsServer } from "@/interfaces/api";
import { MRT_ColumnDef } from "mantine-react-table";

interface LogsList {
  data: LogsServer[];
}

export default function LogServer({ data }: LogsList) {

    const columns: MRT_ColumnDef<any>[] = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "level", header: "Level" },
        { accessorKey: "message", header: "Message" },
        { accessorKey: "timestamp", header: "Times and Date" },
        { accessorKey: "stack", header: "Stack" },
        { accessorKey: "context", header: "Context" },
        { accessorKey: "userId", header: "User ID" },

    ];

  return (
    <>
      <SimpleTable
        columns={columns}
        data={data}
        title="Logs Table"
        enableRowAction={false}
      />
    </>
  );
}
