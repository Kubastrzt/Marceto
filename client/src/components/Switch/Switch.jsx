import React, {useState} from 'react';
import {useStorePopup} from "@/hooks/useStorePopup";
import {useNavigate, useParams} from "react-router-dom";
import {Popover} from "@/components/ui/popover";
import {PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown, PlusCircle, Store} from "lucide-react";
import {cn} from "@/lib/utils";
import {PopoverContent} from "@/components/ui/popover";
import {CommandInput, CommandSeparator, CommandList, Command, CommandEmpty, CommandGroup, CommandItem} from "@/components/ui/command";

const Switch = ({className, items})=>{
    const [open, setOpen] = useState(false);
    const storePopup = useStorePopup()
    const navigate = useNavigate();
    const params = useParams();

    const storesSet = items?.map(item=>({
        label: item.name,
        value: item.id
    }))

    const activeStore = storesSet?.find(item=> item.value === params.sid);

    const onStoreChange = (store)=>{
        setOpen(false);
        navigate(`/dashboard/${params.uid}/${store.value}`);
    }

    return(
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" role="combobox" aria-expanded={open} aria-label="Select a store" className={cn("w-[200px] justify-between", className)}>
                    <Store className="mr-2 h-4 w-4"/>
                    Current store
                    <ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50'/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200] p-0'>
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store.."/>
                        <CommandEmpty>No store found</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {storesSet?.map((store)=>(
                                <CommandItem key={store.value} onSelect={()=>onStoreChange(store)} className="text-sm">{store.label}<Check className={cn("ml-auto h-4 w-4", activeStore?.value === store.value ? "opacity-100" : "opacity-0")}/></CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator/>
                    <CommandList>
                        <CommandGroup>
                            <CommandItem onSelect={()=>{setOpen(false); storePopup.onOpen();}}>
                                <PlusCircle className='mr-2 h-5 w-5'/>
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default Switch