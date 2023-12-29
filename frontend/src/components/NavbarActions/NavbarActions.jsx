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

        <Button className='bg-transparent' onClick={()=>navigate('/cart')}>
        <div className="xl:flex items-center space-x-5">
            <a className="flex items-center text-gray-950 hover:text-gray-800" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="flex absolute -mt-5 ml-4">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500 items-center justify-center text-xs">{cart.items.length}</span>
                </span>
            </a>
        </div>
        </Button>
    );
}

export default NavbarActions