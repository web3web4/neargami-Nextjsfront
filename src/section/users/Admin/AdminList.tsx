"use client";
import { SimpleTable } from "@/components/Table/SimpleTable";
import { UserProfileResponse } from "@/interfaces/api";
import { MRT_ColumnDef } from "mantine-react-table";

interface AdminLists {
      data: UserProfileResponse,
}

export default function AdminList({data} : AdminLists)  {
      const handleEdit = (rowIndex: number) => {
            console.log(`Edit row at index: ${rowIndex}`);
      };

      const handleDelete = (rowIndex: number) => {
            console.log(`Delete row at index: ${rowIndex}`);
      };

      const handleView = (rowIndex: number) => {
            console.log(`view row at index: ${rowIndex}`);
      };
      const columns : MRT_ColumnDef<any>[] = [
            { accessorKey: "id", header: "ID" },
            { accessorKey: "username", header: "User Name" },
            { accessorKey: "firstname", header: "First Name" },
            { accessorKey: "lastname", header: "Last Name" },
            ];

      const actions = [
            { label: "Edit", color: "blue", onClick: handleEdit },
            { label: "Delete", color: "red", onClick: handleDelete },
            { label: "View", color: "green", onClick: handleView }

      ];

    return (
          <>
            <SimpleTable columns={columns} data={data} title="Admin Table" enableRowAction={true} actions={actions}/>
          </>
    );
  };

