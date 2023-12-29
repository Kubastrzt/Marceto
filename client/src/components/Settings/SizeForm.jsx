import React, {useEffect, useState} from 'react';
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
import {toast, ToastContainer} from "react-toastify";
import {Modal} from "@/components/ui/modal";
import {useAuth} from "@clerk/clerk-react";

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1),
})

const SizeForm = ({initialData})=>{
    const {userId} = useAuth();
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        form.reset(initialData || {
            name: '',
            value: '',
        });
    }, [initialData]);


    const title = initialData ? "Edit size" : "Create size";
    const description = initialData ? "Edit a size" : "Add a new size";
    const action = initialData ? "Save changes" : "Create";

    const onDelete = async ()=>{
        try {
            setLoading(true)
            await toast.promise(axios.delete(`http://localhost:3001/api/${params.sid}/${userId}/sizes/${params.sizeId}`),{
                pending: 'Usuwanie...',
                success: 'Rozmiar usunięty 👌',
                error: 'Coś poszło nie tak.. 🤯'
            })
            navigate(`/sizes/${params.sid}/`);
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
            if(initialData) {
                await toast.promise(axios.patch(`http://localhost:3001/api/${params.sid}/${userId}/sizes/${params.sizeId}`, data),{
                    pending: 'Aktualizowanie...',
                    success: 'Rozmiar zaktualizowany 👌',
                    error: 'Coś poszło nie tak.. 🤯'
                })
            } else {
                await toast.promise(axios.post(`http://localhost:3001/api/${params.sid}/${userId}/sizes`, data),{
                    pending: 'Tworzenie...',
                    success: 'Rozmiar stworzony 👌',
                    error: 'Coś poszło nie tak.. 🤯'
                })
            }
            navigate(`/sizes/${params.sid}/`);
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
                <Heading title={title} description={description}/>
                {initialData && <Button disabled={loading} variant='destructive' size='sm' onClick={() => {
                    setOpen(true)
                }}>
                    <Trash className='h-4 w-4'/>
                </Button>}
            </div>
            <Separator/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nazwa</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Nazwa rozmiaru" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Wartość</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Wartość rozmiaru" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator/>
        </>
    );
}

export default SizeForm