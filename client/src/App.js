import React, {useEffect} from 'react';
import {useStorePopup} from "@/hooks/useStorePopup";
import PopupProvider from "./providers/PopupProvider";

const App = ()=>{
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

export default App