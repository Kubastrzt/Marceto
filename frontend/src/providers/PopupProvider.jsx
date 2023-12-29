import React, {useEffect, useState} from 'react';
import PreviewPopup from "../components/PreviewPopup/PreviewPopup";

const PopupProvider = ()=>{
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, []);

    if(!isMounted) {
        return null;
    }

    return(
        <PreviewPopup/>
    );
}

export default PopupProvider