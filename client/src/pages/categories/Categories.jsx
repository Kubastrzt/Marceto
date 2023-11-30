import React, {useEffect, useState} from 'react';
import Header from "@/components/Header/Header";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useAuth} from "@clerk/clerk-react";
import {format} from "date-fns";
import CategoryClient from "@/components/CategoryClient/CategoryClient";

const Categories = ()=>{
    const [allCategories, setAllCategories] = useState([]);
    const params = useParams();
    const {userId} = useAuth();
    const fetchAllCategories = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3001/api/${params.sid}/${userId}/categories`);
            setAllCategories(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchAllCategories()
    }, []);

    useEffect(()=>{

    })
    const formattedCategories = allCategories.length>0 && allCategories.map(item => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
    }))

    return(
        <>
            <Header/>
            <main className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <CategoryClient data={formattedCategories}/>
                </div>
            </main>
        </>
    );
}

export default Categories