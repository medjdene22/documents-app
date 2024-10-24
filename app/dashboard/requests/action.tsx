"use-client"

import React, { use } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react'
import { useDeleteSpecialties } from '@/features/specialties/api/use-delete-specialties '
import { useConfirm } from '@/hooks/use-conform'
import { useOpenSpecialties } from '@/features/specialties/hooks/use-open-specialties '
  

export const Action = ({id} : {id : string}) => {

    const {onOpen} = useOpenSpecialties();
    const deletemutation = useDeleteSpecialties(id);
    const [ConfiramtionDialog, confirm] = useConfirm("Are you sure?","you are about to delete this specialties");

    const isDisabled = deletemutation.isPending;

    const onDelete = async () =>{
        const ok = await confirm();
        if (ok) {
            deletemutation.mutate(undefined,)
            
        }
    }
  return (
    <>
        <ConfiramtionDialog/>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className='size-8 p-0'>
                    <MoreHorizontal className='size-4'/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem 
                    disabled={isDisabled}
                    onClick={() => {
                        onOpen(id)
                    }}
                    className='px-auto'>
                    <Edit className='size-4 mr-2 '/> Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                    disabled={isDisabled}
                    onClick={onDelete}
                    className='px-auto'>
                    <Trash2 className='size-4 mr-2 '/> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}
