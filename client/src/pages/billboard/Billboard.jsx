import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import BillboardForm from "@/components/Settings/BillboardForm";
import Header from "@/components/Header/Header";

const Billboard = ()=>{
    const [billboard, setBillboard]=useState(null)
    const params = useParams();

    const getBillboard = async ()=>{
        try{
            const billboard = await axios.get(`http://localhost:3001/api/${params.sid}/billboard/${params.bid}/`)
            setBillboard(billboard.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getBillboard();
    },[params])

    return(
        <>
            <Header/>
            <main className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-4'>
                    <BillboardForm initialData={billboard}/>
                </div>
            </main>
        </>
    );
}

export default Billboard