"use client";
import { SimpleTable } from "@/components/Table/SimpleTable";
import { UserProfileResponse } from "@/interfaces/api";
import {  handleView, handleCancelAdmin } from "./useAdmin";
import { MRT_ColumnDef } from "mantine-react-table";
import { useState } from "react";

interface AdminLists {
  data: UserProfileResponse[],
}

export default function AdminList({ data }: AdminLists) {
  const [userData, setData] = useState<UserProfileResponse[]>(data);

  const columns: MRT_ColumnDef<any>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "username", header: "User Name" },
    { accessorKey: "firstname", header: "First Name" },
    { accessorKey: "lastname", header: "Last Name" },
  ];

  const actions = [
    //{ label: "Delete", color: "red", onClick: (rowIndex: number) => handleDelete(rowIndex, userData, setData) },
    { label: "View", color: "green", onClick: (rowIndex: number) => handleView(rowIndex, userData) },
    { label: "Cancel Admin", color: "black", onClick: (rowIndex: number) => handleCancelAdmin(rowIndex, userData, setData) }
  ];

  return (
    <>
      <SimpleTable columns={columns} data={userData} title="Admin Table" enableRowAction={true} actions={actions} />
    </>
  );
};
