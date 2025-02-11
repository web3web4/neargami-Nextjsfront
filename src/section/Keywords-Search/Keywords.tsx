"use client";

import { SimpleTable } from "@/components/Table/SimpleTable";
import { KeywordsSearch } from "@/interfaces/api";
import { MRT_Cell, MRT_ColumnDef } from "mantine-react-table";
import { Badge } from "@mantine/core"; 

interface KeywordList {
    data: KeywordsSearch[];
}

export default function Keywords({ data }: KeywordList) {

    const columns: MRT_ColumnDef<any>[] = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "keyword", header: "Keyword" },
        {
            accessorKey: "query",
            header: "Query",
            Cell: ({ cell }: { cell: MRT_Cell<string[]> }) => {
                const queries: string[] = cell.getValue<string[]>(); 
                return (
                    <>
                    <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                        {queries.map((query, index) => (
                            <Badge key={index} color="green" variant="filled">
                                {query}
                            </Badge>
                        ))}
                    </div>
                    </>
                );
            },
        },
        { accessorKey: "timestamp", header: "Times and Date" },
    ];

    return (
        <>
            <SimpleTable columns={columns} data={data} title="Keywords Search" enableRowAction={false} />
        </>
    );
}
