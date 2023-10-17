import React, {useEffect} from 'react';
import {useStorePopup} from "./hooks/use-store-popup";

const App = ()=>{
    const onOpen = useStorePopup((state)=>state.onOpen);
    const isOpen = useStorePopup((state)=>state.isOpen);

    useEffect(() => {
        if(!isOpen){
            onOpen();
        }
    }, [isOpen, onOpen]);

    return(
        <div>
            Root
        </div>
    );
}

export default App