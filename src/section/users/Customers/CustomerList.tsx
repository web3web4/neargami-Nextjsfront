"use client";
import { SimpleTable } from "@/components/Table/SimpleTable";
import { UserProfileData } from "@/interfaces/api";
import { handleDelete, handleView, handleBloack, handleAdmin } from "./useCustomers";
import { MRT_ColumnDef } from "mantine-react-table";
import { useState } from "react";

export interface AdminLists {
    data: UserProfileData[],
}

export default function CustomerList({ data }: AdminLists) {
    const [userData, setUserData] = useState<UserProfileData[]>(data);

    const columns: MRT_ColumnDef<any>[] = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "username", header: "User Name" },
        { accessorKey: "firstname", header: "First Name" },
        { accessorKey: "lastname", header: "Last Name" },
    ];

    const actions = [
        { label: "Delete", color: "red", onClick: (rowIndex: number) => handleDelete(rowIndex, userData) },
        { label: "View", color: "green", onClick: (rowIndex: number) => handleView(rowIndex, userData) },
        { label: "Block", color: "orange", onClick: handleBloack },
        { label: "Make Admin", color: "black", onClick: (rowIndex: number) => handleAdmin(rowIndex, userData, setUserData) },
    ];

    return (
        <>
            <SimpleTable columns={columns} data={userData} title="Customer Table" enableRowAction={true} actions={actions} />
        </>
    );
};
