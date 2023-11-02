import React, {useEffect, useState} from 'react';
import {useAuth, UserButton} from "@clerk/clerk-react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Navigation from "@/components/Navigation/Navigation";

const Dashboard = ()=>{
    const [store, setStore] = useState({})
    const {userId} = useAuth()
    const params = useParams();
    const navigate = useNavigate();

    if(!userId) {
        navigate('/sign-in/');
    }

    const getAvailableStore = async ()=>{
        const response = await axios.get(`http://localhost:3001/api/user/${userId}/${params.sid}`)
        setStore(response.data)
    }

    useEffect(() => {
        getAvailableStore()
    }, []);

    if(!store) {
        navigate('/');
    }

    return(
        <>
            <Navigation/>
            Active store: {store?.name}
            <UserButton/>
        </>
    );
}

export default Dashboard