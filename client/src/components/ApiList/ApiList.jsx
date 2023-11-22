import React from 'react';
import {useParams} from "react-router-dom";
import {useOrigin} from "../../hooks/useOrigin";
import {useAuth} from "@clerk/clerk-react";
import ApiPopup from "../ui/api-popup";

const ApiList = ({entityName, entityIdName})=>{
    const params = useParams();
    const origin = useOrigin();
    const {userId} = useAuth();

    const baseUrl = `${origin}/api/${params.sid}/${userId}`;

    return(
        <>
            <ApiPopup title="GET" variant='public' description={`${baseUrl}/${entityName}`}/>
            <ApiPopup title="GET" variant='public' description={`${baseUrl}/{${entityIdName}}`}/>
            <ApiPopup title="POST" variant='admin' description={`${baseUrl}/${entityName}`}/>
            <ApiPopup title="PATCH" variant='admin' description={`${baseUrl}/${entityName}/{${entityIdName}}`}/>
            <ApiPopup title="DELETE" variant='admin' description={`${baseUrl}/${entityName}/{${entityIdName}}`}/>
        </>
    );
}

export default ApiList