import React from 'react';
import usePreview from "../../hooks/use-preview";
import Popup from "../ui/popup";
import Gallery from "../Gallery/Gallery";
import Info from "../Info/Info";

const PreviewPopup = ()=>{
    const preview = usePreview()
    const product = usePreview((state)=>state.data)

    if(!product) {
        return null
    }

    return(
        <Popup open={preview.isOpen} onClose={preview.onClose}>
            <div className='grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8'>
                <div className='sm:col-span-4 lg:col-span-5'>
                    <Gallery images={product.images}/>
                </div>
                <div className='sm:col-span-8 lg:col-span-7'>
                    <Info data={product}/>
                </div>
            </div>
        </Popup>
    );
}

export default PreviewPopup