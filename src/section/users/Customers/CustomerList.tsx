"use client";
import { SimpleTable } from "@/components/Table/SimpleTable";
import { UserProfileData } from "@/interfaces/api";
import {  handleView, handleBloack, handleAdmin } from "./useCustomers";
import { MRT_ColumnDef } from "mantine-react-table";
import { useState } from "react";
import { Badge } from "@mantine/core";

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
        {
            accessorKey: "blocked",
            header: "Blocked",
            Cell: ({ cell }) => {
                const isBlocked = cell.getValue<boolean>(); 
                return (
                    <Badge color={isBlocked ? "red" : " "} variant="filled">
                        {isBlocked ? "Yes" : " "}
                    </Badge>
                );
            },
        },
    ];

    const actions = [
        //{ label: "Delete", color: "red", onClick: (rowIndex: number) => handleDelete(rowIndex, userData) },
        { label: "View", color: "green", onClick: (rowIndex: number) => handleView(rowIndex, userData) },
        { label: "Block", color: "orange", onClick: (rowIndex: number) => handleBloack(rowIndex, userData, setUserData) },
        { label: "Make Admin", color: "black", onClick: (rowIndex: number) => handleAdmin(rowIndex, userData, setUserData) },
    ];

    return (
        <>
            <SimpleTable columns={columns} data={userData} title="Customer Table" enableRowAction={true} actions={actions} />
        </>
    );
};
