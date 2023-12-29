import React from 'react';
import Currency from "../Currency/Currency";
import Button from "../ui/button";
import {ShoppingCart} from "lucide-react";
import useCart from "../../hooks/use-cart";

const Info = ({data})=>{
    const cart = useCart()

    const onCartAdd = (event)=> {
        event.stopPropagation()

        cart.addItems(data)
    }
    return(
        <div>
            <h1 className='text-3xl font-bold text-gray-900'>
                {data.name}
            </h1>
            <div className='mt-3 flex items-end justify-between'>
                <p className='text-2xl text-gray-900'>
                    <Currency value={data?.price}/>
                </p>
            </div>
            <hr className='my-4'/>
            <div className='flex items-center gap-x-4'>
                <h2 className='font-semibold text-black'>Rozmiar:</h2>
                <div>
                    {data?.size?.name}
                </div>
            </div>
            <div className='flex items-center gap-x-4'>
                <h2 className='font-semibold text-black'>Kolor:</h2>
                <div className='h-6 w-6 rounded-full border border-gray-600' style={{backgroundColor: data?.color?.value}}>
                </div>
            </div>
            <div className='mt-10 flex items-center gap-x-3'>
                <Button className='flex items-center gap-x-2' onClick={onCartAdd}>
                    Dodaj do koszyka
                    <ShoppingCart/>
                </Button>
            </div>
        </div>
    );
}

export default Info