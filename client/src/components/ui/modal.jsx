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
        <Popup title='Jesteś pewien?' description='Ta akcja nie może zostać cofnięta!' isOpen={isOpen} onClose={onClose}>
            <div className='flex items-center gap-3'>
            <Button disabled={loading} variant='outline' onClick={onClose}>
                Anuluj
            </Button>
            <Button disabled={loading} variant='destructive' onClick={onConfirm}>
                Potwierdź
            </Button>
            </div>
        </Popup>
    );
}
