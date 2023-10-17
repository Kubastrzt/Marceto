import Popup from "@/components/ui/popup";
import {useStorePopup} from "@/hooks/use-store-popup";

const StorePopup = ()=>{
    const storePopup = useStorePopup();

    return(
        <Popup title='Create store' onClose={()=>storePopup.onClose()} isOpen={storePopup.isOpen} description='Add a new store to manage products'>
            Future Create Store Form
        </Popup>
    )
}

export default StorePopup