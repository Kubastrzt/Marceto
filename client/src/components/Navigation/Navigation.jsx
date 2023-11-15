import React from 'react';
import {useLocation, useParams, Link} from "react-router-dom";
import {cn} from "@/lib/utils";

const Navigation = ()=>{
    const params = useParams();
    const {pathname} = useLocation();
    const routes = [
        {
            href: `/dashboard/${params.id}/${params.sid}/settings/`,
            label: 'Settings',
            active: pathname === `/dashboard/${params.id}/${params.sid}/settings/`
        }
    ]
    return(
        <nav>
            <ul>
                {routes.map((route)=>(<li><Link key={route.href} to={route.href} className={cn(route.active ? "text-blue-400" : "text-gray-950")}>{route.label}</Link></li>))}
            </ul>
        </nav>
    );
}

export default Navigation