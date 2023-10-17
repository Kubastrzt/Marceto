import {create} from 'zustand';

const useStorePopup = create((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export { useStorePopup };