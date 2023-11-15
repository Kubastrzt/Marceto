import React, {useEffect, useState} from 'react';
import {useAuth, UserButton} from "@clerk/clerk-react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Header from "@/components/Header/Header";

const Dashboard = ()=>{
    const [store, setStore] = useState({})
    const {userId} = useAuth()
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(!userId) {
            navigate('/sign-in/');
        }

        const getAvailableStore = async ()=>{
            const response = await axios.get(`http://localhost:3001/api/user/${userId}/${params.sid}`)
            setStore(response.data)
        }

        getAvailableStore()

        if(!store) {
            navigate('/');
        }
    }, []);

    return(
        <>
            <Header/>
            Active store: {store?.name}
        </>
    );
}

export default Dashboard