import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
  } from "@/components/ui/sheet"
import { SpecialtieForm } from "./requests-form";
import { insertSpecialtiesSchima } from "@/db/schema";
import { z } from "zod";
import { useEditSpecialties } from "../api/use-edit-specialties";
import { useDeleteSpecialties } from "../api/use-delete-specialties ";
import { useOpenSpecialties } from "../hooks/use-open-requests ";
import { useGetSpecialtie } from "../api/use-get-specialtie";
import { Loader2 } from "lucide-react";
import { useConfirm } from "@/hooks/use-conform"
import { useCreateDepartment } from "@/features/departments/api/use-create-department";
import { useGetDepartments } from "@/features/departments/api/use-get-departments";

import { use } from "react";

export const EditSpecialtiesSheet = () =>{
    
    const formSchema = insertSpecialtiesSchima.omit({
        id: true,
    })
    
    type FormValues = z.input<typeof formSchema>
    
    const {isOpen, onClose, id} = useOpenSpecialties();
    const [ConfiramtionDialog, confirm] = useConfirm("Are you sure?","you are about to delete this Specialties"); 

    const departmentsmutation = useCreateDepartment();
    const onCreateDepartment = (name : string) => departmentsmutation.mutate({
        name,
    });
    const departmentsQuery = useGetDepartments();
    const departmentsOptions = (departmentsQuery.data ?? []).map((department) => ({
        label: department.name,
        value: department.id
    
    })) ;

    const specialtiesQuery = useGetSpecialtie(id)

    const defaultValues = specialtiesQuery.data? {
        name: specialtiesQuery.data.name,
        departmentId: specialtiesQuery.data.departmentId
    } : {
        name: "",
        departmentId: ""
    };
    
    const specialtiesmutation = useEditSpecialties(id);
    const onSubmit = (values : FormValues) =>{
        specialtiesmutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        }
        );
    }

    const deletemutation = useDeleteSpecialties(id)
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

    const isPending = specialtiesmutation.isPending || departmentsmutation.isPending || deletemutation.isPending
    const isLoading = departmentsQuery.isLoading || specialtiesQuery.isLoading

   return(
    <>
        <ConfiramtionDialog/>
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        Edit Specialties
                    </SheetTitle>
                    <SheetDescription>
                        Edit an existing Specialties.
                    </SheetDescription>
                </SheetHeader>
                {isLoading? (
                    <div className="absolute inset-0 items-center justify-center">
                       <Loader2 className="size-4 text-muted-foreground animate-ping"/>
                    </div>
                ) : (
                    <SpecialtieForm onSubmit={onSubmit} disable={isPending} id={id}  defaultValues={defaultValues}
                    departmentOptions={departmentsOptions} onDelete={onDelete} onCreateDepartment={onCreateDepartment}
                    />
                 )}
            </SheetContent>
        </Sheet>
    </>
    )
}