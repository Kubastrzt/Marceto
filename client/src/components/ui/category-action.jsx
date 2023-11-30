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

export const CategoryActions = ({data})=>{
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
            await toast.promise(axios.delete(`http://localhost:3001/api/${params.sid}/${userId}/categories/${data.id}`),{
                pending: 'Deleting...',
                success: 'Category deleted 👌',
                error: 'Something went wrong 🤯'
            })
            navigate(`/categories/${userId}/${params.sid}/`);
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
                <Button variant='ghost' className='h-8 w-8 p-0'>
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className='h-4 w-4'/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    Actions
                </DropdownMenuLabel>
                <DropdownMenuItem className='cursor-pointer' onClick={()=>navigate(`/categories/${userId}/${params.sid}/${data.id}`)}>
                    <Edit className='mr-2 h-4 w-4'/>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' onClick={()=>onCopy(data.id)}>
                    <Copy className='mr-2 h-4 w-4'/>
                    Copy ID
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' onClick={()=>setOpen(true)}>
                    <Trash className='mr-2 h-4 w-4'/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    );
}

export default CategoryActions