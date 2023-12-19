import React from 'react';
import IconButton from "../ui/icon-button";
import Currency from "../Currency/Currency";
import {Expand, ShoppingBag} from "lucide-react";
const ProductCard = ({data})=>{
    return(
        <div className='bg-white group cursor-pointer rounded-xl border p-3 space-y-4'>
            <div className='aspect-square rounded-xl bg-gray-100 relative'>
                <img src={data?.images?.[0]?.url} alt='Image' className='rounded-md' />
                <div className='opacity-0 transition absolute w-full px-6 bottom-5 group-hover:opacity-100'>
                    <div className='flex gap-x-6 justify-center'>
                        <IconButton
                            onClick={()=>{}}
                            icon={<Expand size={20} className='text-gray-600'/>}
                        />
                        <IconButton
                            onClick={()=>{}}
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