import React, {useEffect} from 'react';
import PopupProvider from "../../providers/PopupProvider";
import {useStorePopup} from "../../hooks/useStorePopup";

const CreateStore = ()=>{
    const onOpen = useStorePopup((state)=>state.onOpen);
    const isOpen = useStorePopup((state)=>state.isOpen);

    useEffect(() => {
        if(!isOpen){
            onOpen();
        }
    }, [isOpen, onOpen]);

    return(
        <PopupProvider/>
    );
}

export default CreateStore