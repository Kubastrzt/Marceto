import Popup from "@/components/ui/popup";
import {Input} from "@/components/ui/input";
import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form";
import {useStorePopup} from "@/hooks/useStorePopup";
import {Button} from "@/components/ui/button";
import {useNavigate} from 'react-router-dom';

import * as zod from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useState} from "react";
import axios from "axios";
import {useAuth} from "@clerk/clerk-react";
import {toast} from "react-toastify";

const formSchema = zod.object({
    name: zod.string().min(3),

})

const StorePopup = ()=>{
    const storePopup = useStorePopup();
    const navigate = useNavigate();
    const {userId} = useAuth();

    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    const onSubmit = async (values)=>{
        setLoading(true);
        const newValues = {...values, userId}

        try {
            const response = await toast.promise(axios.post('http://localhost:3001/api/stores', newValues), {
                pending: 'Creating store...',
                success: 'Store created 👌 Redirecting...',
                error: 'Something went wrong 🤯'
            });

            if(response) {
                window.location.assign(`/dashboard/${response.data.id}/`)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return(
        <>
        <Popup title='Create store' onClose={()=>storePopup.onClose()} isOpen={storePopup.isOpen} description='Add a new store to manage products'>
            <div className='space-y-4 py-2 pb-4'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField controll={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder={"Shop name"} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                            <Button disabled={loading} variant="outline" onClick={storePopup.onClose}>Cancel</Button>
                            <Button disabled={loading} type="submit">Continue</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Popup>
        </>
    )
}

export default StorePopup