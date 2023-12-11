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

    if(!userId) {
        navigate('/sign-in/');
    }

    const getAvailableStores = async ()=>{
        try {
            const response = await axios.get(`http://localhost:3001/api/${userId}/stores`);
            setStores(response.data);
        } catch (error) {
            console.error('Axios Error:', error);
        }
    }

    useEffect(() => {
        getAvailableStores()
    }, [userId]);

    const routes = [
        {
            href: `/dashboard/${params.uid}/${params.sid}/`,
            label: 'Dashboard',
            active: pathname === `/dashboard/${params.uid}/${params.sid}/`
        },
        {
            href: `/billboards/${params.uid}/${params.sid}/`,
            label: 'Billboards',
            active: pathname === `/billboards/${params.uid}/${params.sid}/`
        },
        {
            href: `/settings/${params.uid}/${params.sid}/`,
            label: 'Settings',
            active: pathname === `/settings/${params.uid}/${params.sid}/`
        },
        {
            href: `/categories/${params.uid}/${params.sid}/`,
            label: 'Categories',
            active: pathname === `/categories/${params.uid}/${params.sid}/`
        },
        {
            href: `/sizes/${params.uid}/${params.sid}/`,
            label: 'Sizes',
            active: pathname === `/sizes/${params.uid}/${params.sid}/`
        },
        {
            href: `/colors/${params.uid}/${params.sid}/`,
            label: 'Colors',
            active: pathname === `/colors/${params.uid}/${params.sid}/`
        },
        {
            href: `/products/${params.uid}/${params.sid}/`,
            label: 'Products',
            active: pathname === `/products/${params.uid}/${params.sid}/`
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