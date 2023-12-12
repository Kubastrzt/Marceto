import React, {useEffect, useState} from 'react';
import Header from "@/components/Header/Header";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useAuth} from "@clerk/clerk-react";
import {format} from "date-fns";
import ColorClient from "@/components/ColorClient/ColorClient";

const Colors = ()=>{
    const [allColors, setAllColors] = useState([]);
    const params = useParams();
    const {userId} = useAuth();
    const fetchAllColors = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3001/api/${params.sid}/colors`);
            setAllColors(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchAllColors()
    }, []);

    useEffect(()=>{

    })
    const formattedColors = allColors.length>0 && allColors.map(item => ({
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
                    <ColorClient data={formattedColors}/>
                </div>
            </main>
        </>
    );
}

export default Colors