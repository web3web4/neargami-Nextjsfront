import { MRT_ColumnDef, MRT_Cell, MRT_Row  } from "mantine-react-table";
//import Image from "next/image";
//import photoDefault from "@/assets/images/no-Course.png";



// functions for actions
export const handleEdit = (rowIndex: number) => {
  console.log(`Edit row at index: ${rowIndex}`);
};

export const handleDelete = (rowIndex: number) => {
  console.log(`Delete row at index: ${rowIndex}`);
};

export const handleView = (rowIndex: number) => {
  console.log(`View row at index: ${rowIndex}`);
};

export const handleApprove = (rowIndex: number) => {
  console.log(`Approve row at index: ${rowIndex}`);
};

export const handleReject = (rowIndex: number) => {
  console.log(`Reject row at index: ${rowIndex}`);
};

// this for columns table
export const columns: MRT_ColumnDef<any>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "slug", header: "Slug" },
  /*
  {
    accessorKey: "logo",
    header: "Image",
    Cell: ({ cell }: { cell: MRT_Cell }) => {
      const logo = cell.getValue<string>() || photoDefault.src;
      return (
        <div style={{ position: "relative", width: 50, height: 50 }}>
          <Image src={logo} alt="Course Logo" layout="fill" objectFit="cover" />
        </div>
      );
    },
  },
  */
  { accessorKey: "name", header: "Name" },
  { accessorKey: "difficulty", header: "Difficulty" },
  {
    accessorKey: "publish_status",
    header: "Status",
    Cell: ({ cell }: { cell: MRT_Cell<any> }) => {
      const status = cell.getValue<string>();
      const statusColors: Record<string, string> = {
        DRAFT: "orange",
        APPROVED: "green",
        REJECTED: "red",
      };

      return (
        <span
          style={{
            color: "white",
            backgroundColor: statusColors[status] || "gray",
            padding: "4px 8px",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          {status}
        </span>
      );
    },
  },
  { accessorKey: "teacher.id", header: "Teacher ID" },
];

// this action for table with conditional buttons
export const getActions = (row: MRT_Row<any>) => {
  const status = row.original.publish_status; 

  const baseActions = [
    { label: "Edit", color: "blue", onClick: () => handleEdit(row.index) },
    { label: "Delete", color: "orange", onClick: () => handleDelete(row.index) },
    { label: "View", color: "black", onClick: () => handleView(row.index) },
  ];

  if (status === "DRAFT") {
    baseActions.push({
      label: "Approve",
      color: "green",
      onClick: () => handleApprove(row.index),
    });
    baseActions.push({
      label: "Reject",
      color: "red",
      onClick: () => handleReject(row.index),
    });
  } else if (status === "REJECTED") {
    baseActions.push({
      label: "Approve",
      color: "green",
      onClick: () => handleApprove(row.index),
    });
  }

  return baseActions;
};
  

  
