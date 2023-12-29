import React, {useState} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "./dropdown-menu";
import {Button} from "./button";
import {Edit, MoreHorizontal, Trash, Copy} from "lucide-react";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "@clerk/clerk-react";
import axios from "axios";
import {Modal} from "./modal";

export const ProductActions = ({data})=>{
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const {userId} = useAuth();
    const params = useParams();
    const navigate = useNavigate();
    const onCopy = (id) =>{
        navigator.clipboard.writeText(id)
        toast.success("Copied to clipboard")
    }
    const onDelete = async ()=>{
        try {
            setLoading(true)
            await toast.promise(axios.delete(`http://localhost:3001/api/${params.sid}/${userId}/products/${data.id}`),{
                pending: 'Usuwanie...',
                success: 'Produkt został usunięty 👌',
                error: 'Coś poszło nie tak.. 🤯'
            })
            navigate(`/products/${params.sid}/`);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return(
        <>
            <Modal isOpen={open} onClose={()=>setOpen(false)} onConfirm={onDelete} loading={loading}/>
            <ToastContainer/>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0 bg-gray-700'>
                    <span className='sr-only'>Otwórz menu</span>
                    <MoreHorizontal className='h-4 w-4'/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className='bg-gray-700 text-white'>
                <DropdownMenuLabel>
                    Akcje
                </DropdownMenuLabel>
                <DropdownMenuItem className='cursor-pointer' onClick={()=>navigate(`/products/${params.sid}/${data.id}`)}>
                    <Edit className='mr-2 h-4 w-4'/>
                    Edytuj
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' onClick={()=>onCopy(data.id)}>
                    <Copy className='mr-2 h-4 w-4'/>
                    Kopiuj
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' onClick={()=>setOpen(true)}>
                    <Trash className='mr-2 h-4 w-4'/>
                    Usuń
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    );
}

export default ProductActions