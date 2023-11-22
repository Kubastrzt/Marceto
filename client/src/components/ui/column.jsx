import Actions from "./billboard-action";

export const columns = [
    {
        accessorKey: "label",
        header: "Label",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({row})=> <Actions data={row.original}/>
    }
]
