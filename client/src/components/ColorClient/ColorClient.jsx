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
                <Heading title={`Kolory (${data ? data.length : '0'})`} description='Dostępne kolory w sklepie'/>
                <Button onClick={()=>navigate(`/colors/${params.sid}/new`)}>
                    <Plus className='mr-2 h-4 w-4'/>
                    Dodaj nowy
                </Button>
            </div>
            <Separator/>
            <DataTable columns={columnsColor} data={data}/>
            <Separator/>
            <Heading title='API' description='Punkty dostępu'/>
            <ApiList entityIdName='colorId' entityName='colors'/>
        </>
    );
}

export default ColorClient