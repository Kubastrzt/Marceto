import React from 'react';
import {Alert} from "@/components/ui/alert";
import {Copy, Server} from "lucide-react";
import {AlertTitle} from "@/components/ui/alert";
import {Badge} from "@/components/ui/badge";
import {AlertDescription} from "./alert";
import {Button} from "./button";
import {toast} from "react-toastify";

const textMap = {
    public: 'Public',
    admin: 'Admin',
};

const variantMap = {
    public: "secondary",
    admin: "destructive",
}

const ApiPopup = ({title,description,variant = 'public'})=>{
    const onCopy = (description) =>{
        navigator.clipboard.writeText(description)
        toast.success("Copied to clipboard")
    }

    return(
        <Alert>
            <Server className='h-4 w-4'/>
            <AlertTitle className='flex items-center gap-x-2'>
                {title}
                <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
            </AlertTitle>
            <AlertDescription className='mt-4 flex items-center justify-between'>
                <code className='relative rounded bg-muted px-[0.3rem] font-mono py-[0.2rem] text-sm font-semibold'>{description}</code>
                <Button variant='outline' size='icon' onClick={()=>onCopy(description)}>
                    <Copy className='h-4 w-4'/>
                </Button>
            </AlertDescription>
        </Alert>
    );
}

export default ApiPopup