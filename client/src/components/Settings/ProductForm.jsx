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
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import {useAuth} from "@clerk/clerk-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import {FormDescription} from "../ui/form";

const formSchema = z.object({
    name: z.string().min(1),
    images: z.object({url: z.string()}).array(),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    sizeId: z.string().min(1),
    colorId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
})

const ProductForm = ({initialData, sizes, categories, colors})=>{
    const {userId} = useAuth();
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        form.reset(initialData ? {...initialData,
            price: parseFloat(String(initialData?.price))
        } : {
            name: '',
            images: [],
            price: 0,
            categoryId: '',
            colorId: '',
            sizeId: '',
            isFeatured: false,
            isArchived: false,
        });
    }, [initialData]);


    const title = initialData ? "Edit product" : "Create product";
    const description = initialData ? "Edit a product" : "Add a new product";
    const action = initialData ? "Save changes" : "Create";

    const onDelete = async ()=>{
        try {
            setLoading(true)
            await toast.promise(axios.delete(`http://localhost:3001/api/${params.sid}/${userId}/products/${params.productId}`),{
                pending: 'Deleting...',
                success: 'Product deleted 👌',
                error: 'Something went wrong 🤯'
            })
            navigate(`/products/${userId}/${params.sid}/`);
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
                await toast.promise(axios.patch(`http://localhost:3001/api/${params.sid}/${userId}/products/${params.productId}`, data),{
                    pending: 'Updating...',
                    success: 'Product updated 👌',
                    error: 'Something went wrong 🤯'
                })
            } else {
                await toast.promise(axios.post(`http://localhost:3001/api/${params.sid}/${userId}/products`, data),{
                    pending: 'Creating...',
                    success: 'Product created 👌',
                    error: 'Something went wrong 🤯'
                })
            }
            navigate(`/products/${userId}/${params.sid}/`);
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
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? field.value.map((image)=>image.url) : []}
                                        disabled={loading}
                                        onChange={(url) => {
                                            const updatedValue = field.value ? [...field.value, { url }] : [{ url }];
                                            field.onChange(updatedValue);
                                        }}
                                        onRemove={(url) => {field.onChange([...field.value.filter((current)=>current.url !== url)])}}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Product name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={loading} placeholder="0.99" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder='Select a category'/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories?.map(category=>(
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sizeId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder='Select a size'/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {sizes?.map(size=>(
                                                <SelectItem key={size.id} value={size.id}>
                                                    {size.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="colorId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder='Select a color'/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {colors?.map(color=>(
                                                <SelectItem key={color.id} value={color.id}>
                                                    {color.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isFeatured"
                            render={({ field }) => (
                                <FormItem className='flex flex-row items-start space-x-3 rounded-md p-4'>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className='space-y-1 leading-none'>
                                        <FormLabel>
                                            Featured
                                        </FormLabel>
                                        <FormDescription>
                                            This product will be in featured collection
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isArchived"
                            render={({ field }) => (
                                <FormItem className='flex flex-row items-start space-x-3 rounded-md p-4'>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className='space-y-1 leading-none'>
                                        <FormLabel>
                                            Archived
                                        </FormLabel>
                                        <FormDescription>
                                            This product will not be present in store
                                        </FormDescription>
                                    </div>
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

export default ProductForm