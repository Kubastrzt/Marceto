import React, {useEffect, useRef} from 'react';
import Heading from "@/components/ui/heading";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useNavigate, useParams} from "react-router-dom";
import {DataTable} from "@/components/ui/data-table";
import {Separator} from "@/components/ui/separator";
import {columnsCategories} from "@/components/ui/column";
import ApiList from "../ApiList/ApiList";

const CategoryClient = ({data})=>{
    const navigate = useNavigate();
    const params = useParams();

    return(
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`Kategorie (${data ? data.length : '0'})`} description='Kategorie produktów w sklepie'/>
                <Button onClick={()=>navigate(`/categories/${params.sid}/new`)}>
                    <Plus className='mr-2 h-4 w-4'/>
                    Dodaj
                </Button>
            </div>
            <Separator/>
            <DataTable columns={columnsCategories} data={data}/>
            <Separator/>
            <Heading title='API' description='Punkty dostępu'/>
            <ApiList entityIdName='categoryId' entityName='categories'/>
        </>
    );
}

export default CategoryClient