import React, {useEffect, useState} from 'react';
import Button from "../ui/button";
import {ShoppingBag} from "lucide-react";
import useCart from "../../hooks/use-cart";
import {useNavigate} from "react-router-dom";

const NavbarActions = ()=>{
    const [isMounted, setIsMounted] = useState(false);
    const navigate = useNavigate()
    const cart = useCart()

    useEffect(() => {
        setIsMounted(true)
    }, []);

    if(!isMounted) {
        return null;
    }

    return(
        <div className='ml-auto flex items-center gap-x-4'>
            <Button className='flex items-center rounded-full' onClick={()=>navigate('/cart')}>
                <ShoppingBag size={20} color='white'/>
                <span className='ml-2 text-sm font-medium text-white'>{cart.items.length}</span>
            </Button>
        </div>
    );
}

export default NavbarActions