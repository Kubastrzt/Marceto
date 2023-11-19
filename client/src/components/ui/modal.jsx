import React, {useEffect, useState} from 'react';
import Popup from "./popup";
import {Button} from "./button";

export const Modal = ({isOpen, onClose, onConfirm, loading})=>{
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return null;
    }

    return(
        <Popup title='Are you sure?' description='This action cannot be undone!' isOpen={isOpen} onClose={onClose}>
            <div className='flex items-center gap-3'>
            <Button disabled={loading} variant='outline' onClick={onClose}>
                Cancel
            </Button>
            <Button disabled={loading} variant='destructive' onClick={onConfirm}>
                Confirm
            </Button>
            </div>
        </Popup>
    );
}
