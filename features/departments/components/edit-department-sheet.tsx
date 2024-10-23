import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
  } from "@/components/ui/sheet"
import { DepartmentForm } from "./department-form";
import { insertDepartmentSchima } from "@/db/schema";
import { z } from "zod";
import { useEditDepartment } from "../api/use-edit-department";
import { useDeleteDepartment } from "../api/use-delete-department ";
import { useOpenDepartment } from "../hooks/use-open-department ";
import { useGetDepartment } from "../api/use-get-department";
import { Loader2 } from "lucide-react";
import { useConfirm } from "@/hooks/use-conform"

export const EditDepartmentSheet = () =>{
    
    const formSchema = insertDepartmentSchima.pick({
        name: true,
    })
    
    type FormValues = z.input<typeof formSchema>
    
    const {isOpen, onClose, id} = useOpenDepartment();
    const [ConfiramtionDialog, confirm] = useConfirm("Are you sure?","you are about to delete this department"); 

    const departmentQuery = useGetDepartment(id); 
    const editmutation = useEditDepartment(id);
    const deletemutation = useDeleteDepartment(id);

    const isPending = editmutation.isPending || deletemutation.isPending ;
    const isLoading = departmentQuery.isLoading; 

    const defaultValues = departmentQuery.data? {
        name: departmentQuery.data.name,
    } : {
        name: ""
    };

    const onSubmit = (values : FormValues) =>{
        editmutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        }
        );
    }
    
    const onDelete = async () =>{
        const ok = await confirm();
        if (ok) {
            deletemutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                }
            })
            
        }
    }

    return(
    <>
        <ConfiramtionDialog/>
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        Edit Department
                    </SheetTitle>
                    <SheetDescription>
                        Edit an existing department.
                    </SheetDescription>
                </SheetHeader>
                {isLoading? (
                    <div className="absolute inset-0 items-center justify-center">
                       <Loader2 className="size-4 text-muted-foreground animate-ping"/>
                    </div>
                ) : (
                    <DepartmentForm onSubmit={onSubmit} disable={isPending} defaultValues={defaultValues} id={id} onDelete={onDelete}/>
                )}
            </SheetContent>
        </Sheet>
    </>
    )
}