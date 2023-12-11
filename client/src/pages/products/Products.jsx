import React, {useEffect, useState} from 'react';
import Header from "@/components/Header/Header";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useAuth} from "@clerk/clerk-react";
import {format} from "date-fns";
import {formatter} from '../../lib/utils';
import ProductClient from "@/components/ProductClient/ProductClient";

const Products = ()=>{
    const [allProducts, setAllProducts] = useState([]);
    const params = useParams();
    const {userId} = useAuth();
    const fetchAllProducts = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3001/api/${params.sid}/${userId}/products`);
            setAllProducts(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchAllProducts()
    }, []);

    useEffect(()=>{

    })
    const formattedProducts = allProducts.length>0 && allProducts.map(item => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(parseFloat(item.price)),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
    }))

    return(
        <>
            <Header/>
            <main className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <ProductClient data={formattedProducts}/>
                </div>
            </main>
        </>
    );
}

export default Products