import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import Header from "@/components/Header/Header";
import ColorForm from "@/components/Settings/ColorForm";

const Color = ()=>{
    const [color, setColor]=useState(null)
    const params = useParams();

    const getColor = async ()=>{
        try{
            const color = await axios.get(`http://localhost:3001/api/colors/${params.colorId}/`)
            setColor(color.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getColor();
    },[params])

    return(
        <>
            <Header/>
            <main className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-4'>
                    <ColorForm initialData={color}/>
                </div>
            </main>
        </>
    );
}

export default Color