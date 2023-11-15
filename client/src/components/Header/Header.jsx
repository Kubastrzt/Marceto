import React from 'react';
import Navigation from "@/components/Navigation/Navigation";

const Header = ()=>{
    return(
        <header className='flex p-4 items-center justify-between '>
            <Navigation/>
        </header>
    );
}

export default Header