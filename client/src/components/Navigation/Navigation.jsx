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
            href: `/dashboard/${params.id}/${params.sid}/settings/`,
            label: 'Settings',
            active: pathname === `/dashboard/${params.id}/${params.sid}/settings/`
        }
    ]
    return(
        <nav className='flex gap-3 items-center justify-end w-full'>
            <ul>
                {routes.map((route)=>(<li key={route.href} ><Link to={route.href} className={cn(route.active ? "text-blue-400" : "text-gray-950")}>{route.label}</Link></li>))}
            </ul>
            <Switch items={stores}/>
            <UserButton/>
        </nav>
    );
}

export default Navigation