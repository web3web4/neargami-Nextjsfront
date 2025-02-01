"use client";

import { Button, Paper, Space, Title } from "@mantine/core";
import { MantineReactTable } from "mantine-react-table";

type TableAction = {
  label: string;
  color?: string;
  onClick: (rowIndex: number) => void;
};

type SimpleTableProps = {
  columns: { accessorKey: string; header: string }[]; 
  data: any;
  title:string;
  enableRowAction:boolean;
  actions?: TableAction[];


};

export const SimpleTable = ({ columns, data , title , enableRowAction ,  actions = []}: SimpleTableProps) => {
  return (
    <Paper withBorder radius="md" p="md">
      <Title order={5}>{title}</Title>
      <Space h="md" />
      <MantineReactTable
        columns={columns}
        data={data}
        enableRowActions={enableRowAction}
        mantinePaperProps={{ shadow: "0", withBorder: false }}
        enableClickToCopy={true}
        renderRowActionMenuItems={({ row }) => (
          <div style={{ display: "flex", gap: "8px" }}>
            {actions.map((action, index) => (
              <Button
                key={index}
                size="xs"
                color={action.color || "blue"} 
                onClick={() => action.onClick(row.index)}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      />
    </Paper>
  );
};
