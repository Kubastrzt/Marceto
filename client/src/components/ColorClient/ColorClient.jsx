import React, {useEffect, useRef} from 'react';
import Heading from "@/components/ui/heading";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useNavigate, useParams} from "react-router-dom";
import {DataTable} from "@/components/ui/data-table";
import {Separator} from "@/components/ui/separator";
import ApiList from "../ApiList/ApiList";
import {columnsColor} from "@/components/ui/column";

const ColorClient = ({data})=>{
    const navigate = useNavigate();
    const params = useParams();

    return(
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`Colors (${data ? data.length : '0'})`} description='Store colors'/>
                <Button onClick={()=>navigate(`/colors/${params.sid}/new`)}>
                    <Plus className='mr-2 h-4 w-4'/>
                    Add new
                </Button>
            </div>
            <Separator/>
            <DataTable columns={columnsColor} data={data}/>
            <Separator/>
            <Heading title='API' description='All endpoints'/>
            <ApiList entityIdName='colorId' entityName='colors'/>
        </>
    );
}

export default ColorClient