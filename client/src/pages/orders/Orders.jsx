import React, {useEffect, useState} from 'react';
import Header from "@/components/Header/Header";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useAuth} from "@clerk/clerk-react";
import {format} from "date-fns";
import {formatter} from "@/lib/utils";
import OrderClient from "@/components/OrderClient/OrderClient";

const Orders = ()=>{
    const [allOrders, setAllOrders] = useState([]);
    const params = useParams();
    const {userId} = useAuth();
    const fetchAllOrders = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3001/api/${params.sid}/${userId}/orders`);
            setAllOrders(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchAllOrders()
    }, []);

    useEffect(()=>{

    })
    const formattedBillboards = allOrders.length>0 && allOrders.map(item => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        products: item.orderItems.map((orderItem) => orderItem.product.name.join(', ')),
        totalPrice: formatter.format(item.orderItems.reduce((total, item)=> {
           return total + Number(item.product.price)
        },0)),
        isPaid: item.isPaid,
        createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
    }))

    return(
        <>
            <Header/>
            <main className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <OrderClient data={formattedBillboards}/>
                </div>
            </main>
        </>
    );
}

export default Orders