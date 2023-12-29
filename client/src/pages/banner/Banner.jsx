import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import BannerForm from "@/components/Settings/BannerForm";
import Header from "@/components/Header/Header";

const Banner = ()=>{
    const [banner, setBanner]=useState(null)
    const params = useParams();

    const getBanner = async ()=>{
        try{
            const banner = await axios.get(`http://localhost:3001/api/${params.sid}/banners/${params.bid}/`)
            setBanner(banner.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getBanner();
    },[params])

    return(
        <>
            <Header/>
            <main className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-4'>
                    <BannerForm initialData={banner}/>
                </div>
            </main>
        </>
    );
}

export default Banner