import React, {useEffect, useState} from 'react';
import {useAuth} from "@clerk/clerk-react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";
import SettingsForm from "../../components/Settings/SettingsForm";


const Settings = ()=>{
    const [store, setStore] = useState();
    const {userId} = useAuth();
    const navigate = useNavigate();
    const params = useParams();

    if(!userId) {
        navigate('/sign-in/')
    }

    const getAvailableStore = async ()=>{
        try {
            const response = await axios.get(`http://localhost:3001/api/user/${userId}/${params.sid}`)
            setStore(response.data)
        } catch (err) {
            console.log(err)
            navigate('/');
        }
    }

    useEffect(() => {
        getAvailableStore()
    }, []);

    return(
        <>
            <Header/>
            <div className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                   <SettingsForm data={store}/>
                </div>
            </div>
        </>
    );
}

export default Settings