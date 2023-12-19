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
            <Container>
                <div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center'>
                    <Link to='/' className='ml-4 flex lg:ml-0 gap-x-2'>
                        <p className='font-bold text-xl'>STORE</p>
                    </Link>
                    <MainNav data={categories}/>
                    <NavbarActions/>
                </div>
            </Container>
        </div>
    );
}

export default Navbar