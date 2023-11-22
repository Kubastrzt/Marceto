import React, {useEffect, useState} from 'react';
import BillboardClient from "@/components/BillboardClient/BillboardClient";
import Header from "@/components/Header/Header";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useAuth} from "@clerk/clerk-react";
import {format} from "date-fns";

const Billboards = ()=>{
    const [allBillboards, setAllBillboards] = useState([]);
    const params = useParams();
    const {userId} = useAuth();
    const fetchAllBillboards = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3001/api/${params.sid}/${userId}/billboards`);
            setAllBillboards(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchAllBillboards()
    }, []);

    useEffect(()=>{

    })
    const formattedBillboards = allBillboards.length>0 && allBillboards.map(item => ({
        id: item.id,
        label: item.label,
        createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
    }))

    return(
        <>
            <Header/>
            <main className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <BillboardClient data={formattedBillboards}/>
                </div>
            </main>
        </>
    );
}

export default Billboards