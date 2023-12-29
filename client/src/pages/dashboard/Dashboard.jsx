import React, {useEffect, useState} from 'react';
import {useAuth, UserButton} from "@clerk/clerk-react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Header from "@/components/Header/Header";
import Heading from "../../components/ui/heading";
import {Separator} from "../../components/ui/separator";
import {Card, CardContent, CardHeader, CardTitle} from "../../components/ui/card";
import {formatter} from "../../lib/utils";
import {CreditCard, DollarSign, Package} from "lucide-react"
import Overview from "../../components/Overview/Overview"

const Dashboard = ()=>{
    const [dashboardValues, setDashboardValues] = useState({revenue: 0, sales: 0, stock: 0, data: []})
    const [store, setStore] = useState({})
    const {userId} = useAuth()
    const params = useParams();
    const navigate = useNavigate();

    const getTotals = async ()=>{
        const revenue = await axios.get(`http://localhost:3001/api/${params.sid}/revenues`)
        const sales = await axios.get(`http://localhost:3001/api/${params.sid}/sales`)
        const stock = await axios.get(`http://localhost:3001/api/${params.sid}/stock`)
        const graph = await axios.get(`http://localhost:3001/api/${params.sid}/graph-revenue`)

        setDashboardValues({...dashboardValues, revenue: revenue.data.totalRevenue, sales: sales.data.salesCount, stock: stock.data.stockCount, data: graph.data.graph})
    }

    useEffect(() => {
        if(!userId) {
            navigate('/sign-in/');
        }

        const getAvailableStore = async ()=>{
            const response = await axios.get(`http://localhost:3001/api/user/${userId}/${params.sid}`)
            setStore(response.data)
        }

        getAvailableStore()
        getTotals()

        if(!store) {
            navigate('/');
        }
    }, []);

    return(
        <>
            <Header/>
            <div className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <Heading title='Pulpit' description='Przegląd aktualnych statystyk'/>
                    <Separator/>
                    <div className='grid grid-cols-3 gap-4'>
                        <div className='flex flex-col gap-4'>
                            <Card className='bg-gray-700 text-white border-black'>
                                <CardHeader className='flex flex-row items-center justify-between'>
                                    <CardTitle className='text-sm font-medium'>
                                        Dochód
                                    </CardTitle>
                                    <DollarSign className='h-4 w-4 text-muted-foreground'/>
                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold text-pink-700'>
                                        {formatter.format(dashboardValues.revenue)}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className='bg-gray-700 text-white border-black'>
                                <CardHeader className='flex flex-row items-center justify-between'>
                                    <CardTitle className='text-sm font-medium'>
                                        Obrót
                                    </CardTitle>
                                    <CreditCard className='h-4 w-4 text-muted-foreground'/>
                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold text-pink-700'>
                                        {dashboardValues.sales}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className='bg-gray-700 text-white border-black'>
                                <CardHeader className='flex flex-row items-center justify-between'>
                                    <CardTitle className='text-sm font-medium'>
                                        Produkty w magazynie
                                    </CardTitle>
                                    <Package className='h-4 w-4 text-muted-foreground'/>
                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold text-pink-600'>
                                        {dashboardValues.stock}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <Card className='col-span-2 bg-gray-700 text-white border-black'>
                            <CardHeader>
                                <CardTitle>Aktualności</CardTitle>
                            </CardHeader>
                            <CardContent className='pl-2'>
                                <Overview data={dashboardValues.data}/>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard