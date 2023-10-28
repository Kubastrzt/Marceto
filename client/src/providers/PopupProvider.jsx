import {useEffect, useState} from "react";

import StorePopup from "@/components/StorePopup/StorePopup";

const PopupProvider = ()=>{
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, []);

    if(!isMounted) {
        return null;
    }

    return (
        <>
            <StorePopup/>
        </>
    )
}

export default PopupProvider