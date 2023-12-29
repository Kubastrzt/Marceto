import React, { useEffect, useRef } from 'react';
import {Image} from "lucide-react";
import {Button} from "@/components/ui/button";

const CloudinaryUploadWidget = ({ onUpload, uploadPreset }) => {
    const widgetRef = useRef(null);

    useEffect(() => {
        const cloudinaryWidget = window.cloudinary.createUploadWidget(
            {
                cloudName: 'dqmgoge9m', // Replace with your Cloudinary cloud name
                uploadPreset: uploadPreset || 'default_preset', // Use provided upload preset or a default one
            },
            (error, result) => {
                if (!error && result && result.event === 'success') {
                    onUpload && onUpload(result);
                }
            }
        );

        widgetRef.current = cloudinaryWidget;

        return () => {
            if (widgetRef.current) {
                widgetRef.current.destroy();
            }
        };
    }, [onUpload, uploadPreset]);

    const openWidget = () => {
        if (widgetRef.current) {
            widgetRef.current.open();
        }
    };

    return (
        <Button type='button'
                onClick={openWidget}
                variant='secondary'
                className='flex gap-3'
        >
            <Image/>Prześlij zdjęcie
        </Button>
    );
};

export default CloudinaryUploadWidget;