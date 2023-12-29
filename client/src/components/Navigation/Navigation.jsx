import React, {useEffect, useState} from 'react';
import {useLocation, useParams, Link, useNavigate} from "react-router-dom";
import {cn} from "@/lib/utils";
import {useAuth, UserButton} from "@clerk/clerk-react";
import Switch from "@/components/Switch/Switch";
import axios from "axios";

const Navigation = ()=>{
    const [stores, setStores] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const {userId} = useAuth()
    const { getToken } = useAuth();

    if(!userId) {
        navigate('/sign-in/');
    }

    const getAvailableStores = async ()=>{
        try {
            const token = await getToken();
            const response = await axios.get(`http://localhost:3001/api/stores`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            setStores(response.data);
        } catch (error) {
            console.error('Axios Error:', error);
        }
    }

    useEffect(() => {
        getAvailableStores()
    }, [getToken]);

    const routes = [
        {
            href: `/dashboard/${params.sid}/`,
            label: 'Dashboard',
            active: pathname === `/dashboard/${params.sid}/`
        },
        {
            href: `/banners/${params.sid}/`,
            label: 'Banners',
            active: pathname === `/banners/${params.sid}/`
        },
        {
            href: `/settings/${params.sid}/`,
            label: 'Settings',
            active: pathname === `/settings/${params.sid}/`
        },
        {
            href: `/categories/${params.sid}/`,
            label: 'Categories',
            active: pathname === `/categories/${params.sid}/`
        },
        {
            href: `/sizes/${params.sid}/`,
            label: 'Sizes',
            active: pathname === `/sizes/${params.sid}/`
        },
        {
            href: `/colors/${params.sid}/`,
            label: 'Colors',
            active: pathname === `/colors/${params.sid}/`
        },
        {
            href: `/products/${params.sid}/`,
            label: 'Products',
            active: pathname === `/products/${params.sid}/`
        },
        {
            href: `/orders/${params.sid}/`,
            label: 'Orders',
            active: pathname === `/orders/${params.sid}/`
        }
    ]
    return(
        <nav className='flex gap-3 items-center justify-end w-full'>
            <ul className='flex gap-3'>
                {routes.map((route)=>(<li key={route.href} ><Link to={route.href} className={cn(route.active ? "font-bold" : "font-normal")}>{route.label}</Link></li>))}
            </ul>
            <Switch items={stores}/>
            <UserButton/>
        </nav>
    );
}

export default Navigation