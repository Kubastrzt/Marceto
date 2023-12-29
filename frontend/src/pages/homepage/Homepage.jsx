import React, {useEffect, useState} from 'react';
import Container from "../../components/ui/container";
import Billboard from "../../components/Billboard/Billboard";
import {getBillboard} from "../../api-calls/get-billboard";
import {getBillboards} from "../../api-calls/get-billboard";
import getProducts from "../../api-calls/get-products";
import ProductsList from "../../components/ProductsList/ProductsList";

const Homepage = ()=>{
    const [billboard, setBillboard] = useState({});
    const [products, setProducts] = useState([]);
    const [test, setTest] = useState([]);

    useEffect(() => {
        const fetchBillboard = async () => {
            try {
                const result = await getBillboard("e76d9062-ac8b-4edc-8435-70e8290b1ad3");
                const result2 = await getBillboards();
                setBillboard(result);
                setTest(result2);
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

        fetchBillboard();
        fetchProducts()
    }, []);

    console.log(test);

    return(
        <Container>
            <div className='space-y-10 pb-10'>
                <Billboard data={billboard}/>
                <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
                    <ProductsList title="Featured Products" items={products}/>
                </div>
            </div>
        </Container>
    );
}

export default Homepage