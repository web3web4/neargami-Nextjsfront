"use client";

import { Button, Paper, Space, Title } from "@mantine/core";
import { MantineReactTable, MRT_ColumnDef, MRT_Row } from "mantine-react-table";

type TableAction = {
  label: string;
  color?: string;
  onClick: (rowIndex: number) => void;
};

type SimpleTableProps = {
  columns: { accessorKey: string; header: string }[] | MRT_ColumnDef<any>[]; 
  data: any;
  title: string;
  enableRowAction: boolean;
  actions?: TableAction[];  
  getActions?: (row: MRT_Row<any>) => TableAction[]; 
};

export const SimpleTable = ({
  columns,
  data,
  title,
  enableRowAction,
  actions = [],
  getActions,  
}: SimpleTableProps) => {
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
        renderRowActionMenuItems={({ row }) => {
          const rowActions = [...actions, ...(getActions ? getActions(row) : [])];

          return (
            <div style={{ display: "flex", gap: "8px" }}>
              {rowActions.map((action, index) => (
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
          );
        }}
      />
    </Paper>
  );
};
