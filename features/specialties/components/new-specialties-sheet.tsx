import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
  } from "@/components/ui/sheet"
import { useNewSpecialties } from "../hooks/use-new-specialties"
import { SpecialtieForm } from "./specialties-form";
import { insertSpecialtiesSchima } from "@/db/schema";
import { z } from "zod";
import { useCreateSpecialties } from "../api/use-create-specialties";
import { useCreateDepartment } from "@/features/departments/api/use-create-department";
import { Loader2 } from "lucide-react";
import { useGetDepartments } from "@/features/departments/api/use-get-departments";

export const NewSpecialtiesSheet = () =>{
    
    const formSchema = insertSpecialtiesSchima.omit({
        id: true,
    })
    
    type FormValues = z.input<typeof formSchema>
    
    const {isOpen, onClose} = useNewSpecialties();

    const departmentsmutation = useCreateDepartment();
    const onCreateDepartment = (name : string) => departmentsmutation.mutate({
        name,
    });
    const departmentsQuery = useGetDepartments();
    const departmentsOptions = (departmentsQuery.data ?? []).map((department) => ({
        label: department.name,
        value: department.id
    })) ;

    
    const specialtiesmutation = useCreateSpecialties();
    const onSubmit = (values : FormValues) =>{
        specialtiesmutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        }
        );
    }

    const isPending = specialtiesmutation.isPending ||  departmentsmutation.isPending
    const isLoading = departmentsQuery.isLoading

    return(
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        New Specialties
                    </SheetTitle>
                    <SheetDescription>
                        Add a new Specialties
                    </SheetDescription>
                </SheetHeader>
                {isLoading? (
                    <div className="absolute inset-0 items-center justify-center">
                       <Loader2 className="size-4 text-muted-foreground animate-ping"/>
                    </div>
                ) : (
                    <SpecialtieForm onSubmit={onSubmit} disable={isPending} 
                    departmentOptions={departmentsOptions} onCreateDepartment={onCreateDepartment}/>
                )}
                
            </SheetContent>
        </Sheet>
    )
}