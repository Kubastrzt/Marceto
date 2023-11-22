import React, {useEffect, useRef, useState} from 'react';
import {Button} from "@/components/ui/button";
import {Image, Trash} from 'lucide-react';
import CloudinaryUploadWidget from "@/components/CloudinaryWidget/CloudinaryWidget";

const ImageUpload = ({disabled, onChange, onRemove, value})=>{
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, []);

    const onUpload = (result) =>{
        onChange(result.info.secure_url)
    }

    if(!isMounted) {
        return null;
    }

    return(
        <div>
            <div className='mb-4 flex -items-center gap-4'>
                {value.map((url)=>(
                    <div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
                        <div className='z-10 absolute top-2 right-2'>
                            <Button type='button' onClick={()=>onRemove(url)} variant='destructive' size='icon'>
                                <Trash className='h-4 w-4'/>
                            </Button>
                        </div>
                        <img className='object-cover' alt='Image' src={url}/>
                    </div>
                ))}
            </div>
            <CloudinaryUploadWidget onUpload={onUpload} uploadPreset='uvmfxqpo'/>
        </div>
    );
}

export default ImageUpload