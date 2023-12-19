import React from 'react';
import {Link, useLocation, useResolvedPath} from "react-router-dom";
import {cn} from "../../lib/utils";

const MainNav = ({data})=>{
    const {pathname} = useLocation();

    const routes = data.map(route =>({
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname === `/category/${route.id}`
    }))

    return(
        <nav className='mx-6 flex items-center space-x-4 lg:space-x-6'>
            {routes.map((route)=>(
                <Link key={route.href} to={route.href} className={cn("text-sm font-medium transition-colors hover:text-black", route.active ? "text-black" : "text-neutral-500")}>{route.label}</Link>
            ))}
        </nav>
    );
}

export default MainNav