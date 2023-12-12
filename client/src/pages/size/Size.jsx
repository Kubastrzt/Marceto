import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import Header from "@/components/Header/Header";
import SizeForm from "@/components/Settings/SizeForm";

const Size = ()=>{
    const [size, setSize]=useState(null)
    const params = useParams();

    const getSize = async ()=>{
        try{
            const size = await axios.get(`http://localhost:3001/api/${params.sid}/sizes/${params.sizeId}/`)
            setSize(size.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getSize();
    },[params])

    return(
        <>
            <Header/>
            <main className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-4'>
                    <SizeForm initialData={size}/>
                </div>
            </main>
        </>
    );
}

export default Size