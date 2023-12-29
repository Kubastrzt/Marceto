import React from 'react';
import Heading from "@/components/ui/heading";
import {DataTable} from "@/components/ui/data-table";
import {Separator} from "@/components/ui/separator";
import {columnsOrder} from "@/components/ui/column";

const OrderClient = ({data})=>{
    return(
        <>
            <Heading title={`Zamówienia (${data ? data.length : '0'})`} description='Lista zamówień klientów'/>
            <Separator/>
            <DataTable columns={columnsOrder} data={data}/>
        </>
    );
}

export default OrderClient