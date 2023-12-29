import React, {useEffect, useState} from 'react';
import BannerClient from "@/components/BannerClient/BannerClient";
import Header from "@/components/Header/Header";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useAuth} from "@clerk/clerk-react";
import {format} from "date-fns";

const Banners = ()=>{
    const [allBanners, setAllBanners] = useState([]);
    const params = useParams();
    const {userId} = useAuth();
    const fetchAllBanners = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3001/api/${params.sid}/banners`);
            setAllBanners(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchAllBanners()
    }, []);

    useEffect(()=>{

    })
    const formattedBanners = allBanners.length>0 && allBanners.map(item => ({
        id: item.id,
        label: item.label,
        createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
    }))

    return(
        <>
            <Header/>
            <main className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <BannerClient data={formattedBanners}/>
                </div>
            </main>
        </>
    );
}

export default Banners