import {create} from 'zustand';
import {persist, createJSONStorage} from "zustand/middleware";
import {toast} from "react-toastify";

const useCart = create(
    persist((set,get)=>({
        items: [],
        addItems: (data)=>{
            const currentItems = get().items;
            const existingItems = currentItems.find((item)=>item.id === data.id)
            if (existingItems) {
                return toast.info("Item already in cart.")
            }

            set({items: [...get().items, data]});
            toast.success("Added item.")
        },
        removeItem: (id)=>{
            set({items: [...get().items.filter((item)=>item.id !== id)]})
            toast.success("Removed item.")
        },
        removeAll: ()=>set({items: []})
    }), {
        name: 'cart-storage',
        storage: createJSONStorage(()=>localStorage)
    })
)

export default useCart