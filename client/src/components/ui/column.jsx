import BannerActions from "./banner-action";
import CategoryActions from "./category-action";
import SizeActions from "./size-action";
import ColorActions from "./color-action";
import ProductActions from "./product-action";

export const columns = [
    {
        accessorKey: "label",
        header: "Etykieta",
    },
    {
        accessorKey: "createdAt",
        header: "Data",
    },
    {
        id: "actions",
        cell: ({row})=> <BannerActions data={row.original}/>
    }
]

export const columnsCategories = [
    {
        accessorKey: "name",
        header: "Nazwa",
    },
    {
        accessorKey: "banner",
        header: "Baner",
        cell: ({row})=>row.original.bannerLabel,
    },
    {
        accessorKey: "createdAt",
        header: "Data",
    },
    {
        id: "actions",
        cell: ({row})=> <CategoryActions data={row.original}/>
    }
]

export const columnsSize = [
    {
        accessorKey: "name",
        header: "Nazwa",
    },
    {
        accessorKey: "value",
        header: "Wartość",
    },
    {
        accessorKey: "createdAt",
        header: "Data",
    },
    {
        id: "actions",
        cell: ({row})=> <SizeActions data={row.original}/>
    }
]

export const columnsColor = [
    {
        accessorKey: "name",
        header: "Nazwa",
    },
    {
        accessorKey: "value",
        header: "Wartość",
        cell: ({row})=>(<div className='flex items-center gap-x-2'>
            {row.original.value}
            <div className='h-6 w-6 rounded-full border' style={{backgroundColor: row.original.value}}/>
        </div> )
    },
    {
        accessorKey: "createdAt",
        header: "Data",
    },
    {
        id: "actions",
        cell: ({row})=> <ColorActions data={row.original}/>
    }
]

export const columnsProduct = [
    {
        accessorKey: "name",
        header: "Nazwa",
    },
    {
        accessorKey: "isArchived",
        header: "Zarchiwizowany",
    },
    {
        accessorKey: "isFeatured",
        header: "Wyróżniony",
    },
    {
        accessorKey: "price",
        header: "Cena",
    },
    {
        accessorKey: "category",
        header: "Kategoria",
    },
    {
        accessorKey: "size",
        header: "Rozmiar",
    },
    {
        accessorKey: "color",
        header: "Kolor",
        cell: ({row})=> (
          <div className='flex items-center gap-x-2'>
              {row.original.color}
              <div className='h-6 w-6 rounded-full border' style={{backgroundColor: row.original.color}}/>
          </div>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Data",
    },
    {
        id: "actions",
        cell: ({row})=> <ProductActions data={row.original}/>
    }
]

export const columnsOrder = [
    {
        accessorKey: "products",
        header: "Produkty",
    },
    {
        accessorKey: "phone",
        header: "Numer",
    },
    {
        accessorKey: "address",
        header: "Adres",
    },
    {
        accessorKey: "totalPrice",
        header: "Cena",
    },
    {
        accessorKey: "isPaid",
        header: "Zapłacono",
    },
    {
        accessorKey: "createdAt",
        header: "Data",
    }
]