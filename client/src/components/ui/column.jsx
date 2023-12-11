import BillboardActions from "./billboard-action";
import CategoryActions from "./category-action";
import SizeActions from "./size-action";

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
        cell: ({row})=> <BillboardActions data={row.original}/>
    }
]

export const columnsCategories = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "billboard",
        header: "Billboard",
        cell: ({row})=>row.original.billboardLabel,
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({row})=> <CategoryActions data={row.original}/>
    }
]

export const columnsSize = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "value",
        header: "Value",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({row})=> <SizeActions data={row.original}/>
    }
]
