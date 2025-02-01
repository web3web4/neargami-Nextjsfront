"use client";
import { SimpleTable } from "@/components/Table/SimpleTable";
import { UserProfileData } from "@/interfaces/api";

interface AdminLists {
      data: UserProfileData[],
}

export default function CustomerList({data} : AdminLists)  {
      const handleEdit = (rowIndex: number) => {
            console.log(`Edit row at index: ${rowIndex}`);
      };

      const handleDelete = (rowIndex: number) => {
            console.log(`Delete row at index: ${rowIndex}`);
      };

      const handleView = (rowIndex: number) => {
            console.log(`view row at index: ${rowIndex}`);
      };

      const handleBloack = (rowIndex: number) => {
            console.log(`view row at index: ${rowIndex}`);
      };

      const handleAdmin = (rowIndex: number) => {
            console.log(`view row at index: ${rowIndex}`);
      };
      const columns = [
            { accessorKey: "id", header: "ID" },
            { accessorKey: "username", header: "User Name" },
            { accessorKey: "firstname", header: "First Name" },
            { accessorKey: "lastname", header: "Last Name" },
            ];

      const actions = [
            { label: "Edit", color: "blue", onClick: handleEdit },
            { label: "Delete", color: "red", onClick: handleDelete },
            { label: "View", color: "green", onClick: handleView },
            { label: "Bloack", color: "orange", onClick: handleBloack },
            { label: "Make Admin", color: "black", onClick: handleAdmin },

            ];

    return (
          <>
            <SimpleTable columns={columns} data={data} title="Customer Table" enableRowAction={true} actions={actions} />
          </>
    );
  };

