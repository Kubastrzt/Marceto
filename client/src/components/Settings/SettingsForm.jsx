import React, {useState} from 'react';
import Heading from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Trash} from 'lucide-react';
import {Separator} from "@/components/ui/separator";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import {useAuth} from "@clerk/clerk-react";
import {toast, ToastContainer} from "react-toastify";
import ApiPopup from "@/components/ui/api-popup";
import {useOrigin} from "@/hooks/useOrigin";
import {Modal} from "@/components/ui/modal";

const formSchema = z.object({
    name: z.string().min(1),
})

const SettingsForm = ({data})=>{
    const origin = useOrigin();
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const params = useParams();
    const {userId} = useAuth();
    const [loading, setLoading] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: data
    });

    const onDelete = async ()=>{
        try {
            setLoading(true)
            await toast.promise(axios.delete(`http://localhost:3001/api/${params.sid}/${userId}`),{
                pending: 'Deleting...',
                success: 'Store deleted 👌',
                error: 'Something went wrong 🤯'
            })
            navigate('/');
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }
    const onSubmit = async (data) =>{
        try {
            setLoading(true)
            await toast.promise(axios.patch(`http://localhost:3001/api/${params.sid}/${userId}`, data),{
                pending: 'Updating...',
                success: 'Store name updated 👌',
                error: 'Something went wrong 🤯'
            })
            navigate(0);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return(
        <>
            <ToastContainer/>
            <Modal isOpen={open} onClose={()=>setOpen(false)} onConfirm={onDelete} loading={loading}/>
            <div className='flex items-center justify-between'>
                <Heading title='Settings' description='Store settings'/>
                <Button disabled={loading} variant='destructive' size='sm' onClick={()=>{setOpen(true)}}>
                    <Trash className='h-4 w-4'/>
                </Button>
            </div>
            <Separator/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className='grid grid-cols-3 gap-8'>
                        <FormField controll={form.control} name='name' render={({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Store name" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    </div>
                    <Button disabled={loading} type='submit'>Save changes</Button>
                </form>
            </Form>
            <Separator/>
            <ApiPopup title={'PUBLIC_API_URL'} description={`${origin}/api/${params.sid}`} variant={'public'}/>
        </>
    );
}

export default SettingsForm