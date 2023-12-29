import React from 'react';
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from "recharts";

const Overview = ({data})=>{
    return(
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis dataKey="name" stroke='#BE185D' fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis stroke='#BE185D' fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val)=>`$${val}`}/>
                <Bar dataKey="total" fill='#DB2777' radius={[4,4,0,0]}/>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default Overview