import BannerActions from "./banner-action";
import CategoryActions from "./category-action";
import SizeActions from "./size-action";
import ColorActions from "./color-action";
import ProductActions from "./product-action";

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
        cell: ({row})=> <BannerActions data={row.original}/>
    }
]

export const columnsCategories = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "banner",
        header: "Banner",
        cell: ({row})=>row.original.bannerLabel,
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

export const columnsColor = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "value",
        header: "Value",
        cell: ({row})=>(<div className='flex items-center gap-x-2'>
            {row.original.value}
            <div className='h-6 w-6 rounded-full border' style={{backgroundColor: row.original.value}}/>
        </div> )
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({row})=> <ColorActions data={row.original}/>
    }
]

export const columnsProduct = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "isArchived",
        header: "Archived",
    },
    {
        accessorKey: "isFeatured",
        header: "Featured",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "size",
        header: "Size",
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: ({row})=> (
          <div className='flex items-center gap-x-2'>
              {row.original.color}
              <div className='h-6 w-6 rounded-full border' style={{backgroundColor: row.original.color}}/>
          </div>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({row})=> <ProductActions data={row.original}/>
    }
]

export const columnsOrder = [
    {
        accessorKey: "products",
        header: "Products",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "totalPrice",
        header: "Total price",
    },
    {
        accessorKey: "isPaid",
        header: "Paid",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    }
]