import React, {useEffect, useRef} from 'react';
import Heading from "@/components/ui/heading";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useNavigate, useParams} from "react-router-dom";
import {DataTable} from "@/components/ui/data-table";
import {Separator} from "@/components/ui/separator";
import {columns} from "@/components/ui/column";
import ApiList from "../ApiList/ApiList";

const BannerClient = ({data})=>{
    const navigate = useNavigate();
    const params = useParams();

    return(
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`Banery (${data ? data.length : '0'})`} description='Wszystkie dostępne banery'/>
                <Button onClick={()=>navigate(`/banners/${params.sid}/new`)}>
                    <Plus className='mr-2 h-4 w-4'/>
                    Dodaj
                </Button>
            </div>
            <Separator/>
            <DataTable columns={columns} data={data}/>
            <Separator/>
            <Heading title='API' description='Punkty dostępu'/>
            <ApiList entityIdName='bannerId' entityName='banners'/>
        </>
    );
}

export default BannerClient