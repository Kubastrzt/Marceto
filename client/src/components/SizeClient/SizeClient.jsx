import React, {useEffect, useRef} from 'react';
import Heading from "@/components/ui/heading";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useNavigate, useParams} from "react-router-dom";
import {DataTable} from "@/components/ui/data-table";
import {Separator} from "@/components/ui/separator";
import ApiList from "../ApiList/ApiList";
import {columnsSize} from "@/components/ui/column";

const SizeClient = ({data})=>{
    const navigate = useNavigate();
    const params = useParams();

    return(
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`Sizes (${data ? data.length : '0'})`} description='Store sizes'/>
                <Button onClick={()=>navigate(`/sizes/${params.uid}/${params.sid}/new`)}>
                    <Plus className='mr-2 h-4 w-4'/>
                    Add new
                </Button>
            </div>
            <Separator/>
            <DataTable columns={columnsSize} data={data}/>
            <Separator/>
            <Heading title='API' description='All endpoints'/>
            <ApiList entityIdName='sizeId' entityName='sizes'/>
        </>
    );
}

export default SizeClient