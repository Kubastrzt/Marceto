import React, {useEffect, useState} from 'react';
import Container from "../../components/ui/container";
import Billboard from "../../components/Billboard/Billboard";
import {getBanner} from "../../api-calls/get-banner";
import getProducts from "../../api-calls/get-products";
import ProductsList from "../../components/ProductsList/ProductsList";

const Homepage = ()=>{
    const [banner, setBanner] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const result = await getBanner("e2df01b0-202c-4034-9b1e-f90d2855fd10");
                setBanner(result);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchProducts = async () => {
            try {
                const result = await getProducts({isFeatured: true});
                setProducts(result);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchBanner();
        fetchProducts()
    }, []);

    return(
        <Container>
            <div className='space-y-10 pb-10'>
                <Billboard data={banner}/>
                <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
                    <ProductsList title="Wyróżnione produkty" items={products}/>
                </div>
            </div>
        </Container>
    );
}

export default Homepage