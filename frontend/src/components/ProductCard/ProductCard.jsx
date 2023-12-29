import React from 'react';
import IconButton from "../ui/icon-button";
import Currency from "../Currency/Currency";
import {Expand, ShoppingBag} from "lucide-react";
import {useNavigate} from "react-router-dom";
import previewPopup from "../PreviewPopup/PreviewPopup";
import usePreview from "../../hooks/use-preview";
import useCart from "../../hooks/use-cart";
const ProductCard = ({data})=>{
    const preview = usePreview()
    const cart = useCart()
    const navigate = useNavigate()
    const handleClick = (event)=> {
        event.stopPropagation()

        navigate(`/product/${data?.id}`)
    }

    const onPreview = (event)=> {
        event.stopPropagation()

        preview.onOpen(data)
    }

    const onCartAdd = (event)=> {
        event.stopPropagation()

        cart.addItems(data)
    }

    return(
        <div className='bg-white group cursor-pointer rounded-xl border p-3 space-y-4' onClick={handleClick}>
            <div className='aspect-square rounded-xl bg-gray-100 relative'>
                <img src={data?.images?.[0]?.url} alt='Image' className='rounded-md object-center object-cover aspect-square' />
                <div className='opacity-0 transition absolute w-full px-6 bottom-5 group-hover:opacity-100'>
                    <div className='flex gap-x-6 justify-center'>
                        <IconButton
                            onClick={onPreview}
                            icon={<Expand size={20} className='text-gray-600'/>}
                        />
                        <IconButton
                            onClick={onCartAdd}
                            icon={<ShoppingBag size={20} className='text-gray-600'/>}
                        />
                    </div>
                </div>
            </div>
            <div>
                <p className='font-semibold text-lg'>
                    {data.name}
                </p>
                <p className='text-sm text-gray-500'>
                    {data.category?.name}
                </p>
            </div>
            <div className='flex items-center justify-between'>
                <Currency value={data?.price}/>
            </div>
        </div>
    );
}

export default ProductCard