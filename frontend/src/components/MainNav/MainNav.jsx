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
        <nav className='md:flex px-4 mx-auto font-semibold font-heading space-x-12'>
            {routes.map((route)=>(
                <Link key={route.href} to={route.href} className={cn("text-sm font-medium transition-colors hover:text-gray-900", route.active ? "text-gray-950" : "text-gray-900")}>{route.label}</Link>
            ))}
        </nav>
    );
}

export default MainNav