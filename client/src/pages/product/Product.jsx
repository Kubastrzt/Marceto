import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import ProductForm from "@/components/Settings/ProductForm";
import Header from "@/components/Header/Header";

const Product = ()=>{
    const [product, setProduct]=useState(null);
    const [categories, setCategories]=useState(null);
    const [sizes, setSizes]=useState(null);
    const [colors, setColors]=useState(null);
    const params = useParams();

    const getProduct = async ()=>{
        try{
            const product = await axios.get(`http://localhost:3001/api/products/${params.productId}/`)
            setProduct(product.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getCategories = async ()=>{
        try{
            const categories = await axios.get(`http://localhost:3001/api/${params.sid}/${params.uid}/categories/`)
            setCategories(categories.data)
        } catch (err) {
            console.log(err)
        }
    }
    const getSizes = async ()=>{
        try{
            const sizes = await axios.get(`http://localhost:3001/api/${params.sid}/${params.uid}/sizes/`)
            setSizes(sizes.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getColors = async ()=>{
        try{
            const colors = await axios.get(`http://localhost:3001/api/${params.sid}/${params.uid}/colors/`)
            setColors(colors.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getProduct();
        getCategories();
        getSizes();
        getColors();
    },[params])

    return(
        <>
            <Header/>
            <main className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-4'>
                    <ProductForm initialData={product} categories={categories} colors={colors} sizes={sizes}/>
                </div>
            </main>
        </>
    );
}

export default Product