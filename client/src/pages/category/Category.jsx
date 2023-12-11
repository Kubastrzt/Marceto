import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import Header from "@/components/Header/Header";
import CategoryForm from "@/components/Settings/CategoryForm";

const Category = ()=>{
    const [category, setCategory]=useState(null)
    const [billboards, setBillboards]=useState(null)
    const params = useParams();

    const getCategories = async ()=>{
        try{
            const category = await axios.get(`http://localhost:3001/api/categories/${params.cid}/`)
            setCategory(category.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getBillboards = async ()=>{
        try{
            const billboards = await axios.get(`http://localhost:3001/api/${params.sid}/${params.uid}/billboards/`)
            setBillboards(billboards.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getCategories();
        getBillboards();
    },[params])

    return(
        <>
            <Header/>
            <main className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-4'>
                    <CategoryForm billboards={billboards} initialData={category}/>
                </div>
            </main>
        </>
    );
}

export default Category