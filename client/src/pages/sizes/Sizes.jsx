import React, {useEffect, useState} from 'react';
import Header from "@/components/Header/Header";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useAuth} from "@clerk/clerk-react";
import {format} from "date-fns";
import SizeClient from "@/components/SizeClient/SizeClient";

const Sizes = ()=>{
    const [allSizes, setAllSizes] = useState([]);
    const params = useParams();
    const {userId} = useAuth();
    const fetchAllSizes = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3001/api/${params.sid}/${userId}/sizes`);
            setAllSizes(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchAllSizes()
    }, []);

    useEffect(()=>{

    })
    const formattedSizes = allSizes.length>0 && allSizes.map(item => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
    }))

    return(
        <>
            <Header/>
            <main className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <SizeClient data={formattedSizes}/>
                </div>
            </main>
        </>
    );
}

export default Sizes