import React, {useEffect, useState} from 'react';
import useCart from "../../hooks/use-cart";
import CartItem from "../../components/CartItem/CartItem";
import Container from "../../components/ui/container";
import Summary from "../../components/Summary/Summary";

const Cart = ()=>{
    const cart = useCart();
    const removeAll = useCart((state)=>state.removeAll);



    return(
        <div className='bg-white'>
            <Container>
                <div className='px-4 py-16 sm:px-6 lg:px-8'>
                    <h1 className='text-3xl font-bold text-black'>Shopping Cart</h1>
                    <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-2'>
                        <div className='lg:col-span-7'>
                            {cart.items.length === 0 && <p className='text-neutral-500'>Cart is empty</p>}
                            <ul>
                                {cart.items.map((item)=>(
                                    <CartItem key={item.id} data={item}/>
                                ))}
                            </ul>
                        </div>
                        <Summary/>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Cart