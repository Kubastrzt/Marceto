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
    value: z.string().min(4).regex(/^#/, {
        message: "String must be a valid hex code",
    }),
})

const ColorForm = ({initialData})=>{
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


    const title = initialData ? "Edit color" : "Create color";
    const description = initialData ? "Edit a color" : "Add a new color";
    const action = initialData ? "Save changes" : "Create";

    const onDelete = async ()=>{
        try {
            setLoading(true)
            await toast.promise(axios.delete(`http://localhost:3001/api/${params.sid}/${userId}/colors/${params.colorId}`),{
                pending: 'Deleting...',
                success: 'Color deleted 👌',
                error: 'Something went wrong 🤯'
            })
            navigate(`/colors/${params.sid}/`);
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
                await toast.promise(axios.patch(`http://localhost:3001/api/${params.sid}/${userId}/colors/${params.colorId}`, data),{
                    pending: 'Updating...',
                    success: 'Color updated 👌',
                    error: 'Something went wrong 🤯'
                })
            } else {
                await toast.promise(axios.post(`http://localhost:3001/api/${params.sid}/${userId}/colors`, data),{
                    pending: 'Creating...',
                    success: 'Color created 👌',
                    error: 'Something went wrong 🤯'
                })
            }
            navigate(`/colors/${params.sid}/`);
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
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Color name" {...field} />
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
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <div className='flex items-center gap-x-4'>
                                            <Input disabled={loading} placeholder="Color value" {...field} />
                                            <div className='border p-3' style={{backgroundColor: field.value}}/>
                                        </div>
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

export default ColorForm