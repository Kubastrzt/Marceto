import React, {useEffect, useState} from 'react';
import Container from "../ui/container";
import {Link} from "react-router-dom";
import MainNav from "../MainNav/MainNav";
import getCategories from "../../api-calls/get-categories";
import NavbarActions from "../NavbarActions/NavbarActions";

const Navbar = ()=>{
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getCategories();
                setCategories(result);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);
    return(
        <div className='border-b'>
            <section className="relative mx-auto">
                <nav className="flex justify-between bg-white text-gray-950 w-full">
                    <div className="px-5 xl:px-12 py-6 flex w-full items-center">
                        <Link to='/' className='ml-4 flex lg:ml-0 gap-x-2'>
                            <p className='font-bold text-xl'>Sklep odzieżowy</p>
                        </Link>
                        <MainNav data={categories}/>
                        <NavbarActions/>
                    </div>
                </nav>
            </section>
        </div>
    );
}

export default Navbar