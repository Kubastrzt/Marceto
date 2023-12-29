import {create} from 'zustand';

const usePreview = create((set)=>({
    isOpen: false,
    data: undefined,
    onOpen: (data)=>set({data, isOpen:true}),
    onClose: ()=>set({isOpen: false})
}))

export default usePreview