import React, {useEffect, useRef} from "react";
import {Button} from "./button";
import {Image} from 'lucide-react';

export const UploadWidget = ()=>{
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary;

        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName:'dqmgoge9m',
            uploadPreset: 'uvmfxqpo',
        }, function (error, result) {
            console.log(result);
        });
    },[])

    return (
        <Button onClick={()=>widgetRef.current.open()} variant='outline' className='flex gap-3'>
            <Image/>Prześlij zdjęcie
        </Button>
    )
}
