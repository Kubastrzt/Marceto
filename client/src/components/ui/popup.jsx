import React from 'react';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "./dialog";

const Popup = ({title, description, isOpen, onClose, children})=>{
    const onChange = (open)=>{
        if(!open) {
            onClose();
        }
    }

    return(
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    );
}

export default Popup