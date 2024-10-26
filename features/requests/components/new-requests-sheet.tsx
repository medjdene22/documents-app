import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
  } from "@/components/ui/sheet"
import { useNewrequests } from "../hooks/use-new-requests"
import { RequestForm } from "./requests-form";
import { insertRequestSchima } from "@/db/schema";
import { z } from "zod";
import { useCreateRequests } from "../api/use-create-requests";
import { Loader2 } from "lucide-react";
import { useGetDepartments } from "@/features/departments/api/use-get-departments";
import { useGetSpecialties } from "@/features/specialties/api/use-get-specialties";
import { request } from "http";

export const NewRequestsSheet = () => {
    
    const formSchema = insertRequestSchima.omit({
        id: true,
        status: true,
        userId: true,
        createdAt: true,
    })
    
    type FormValues = z.input<typeof formSchema>
    
    const {isOpen, onClose} = useNewrequests();


    const departmentsQuery = useGetDepartments();
    const departmentsOptions = (departmentsQuery.data ?? []).map((department) => ({
        label: department.name,
        value: department.id
    })) ;

    const specialtiesQuery = useGetSpecialties();
    const specialtiesOptions = (specialtiesQuery.data ?? []).map((specialtie) => ({
        label: specialtie.name,
        value: specialtie.id
    })) ;

    
    const requestsmutation = useCreateRequests();
    const onSubmit = (values : FormValues) =>{
        requestsmutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        }
        );
    }

    const isPending = requestsmutation.isPending
    const isLoading = departmentsQuery.isLoading || specialtiesQuery.isLoading

    return(
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        New Request
                    </SheetTitle>
                    <SheetDescription>
                        Add a new Request
                    </SheetDescription>
                </SheetHeader>
                {isLoading? (
                    <div className="absolute inset-0 items-center justify-center">
                       <Loader2 className="size-4 text-muted-foreground animate-ping"/>
                    </div>
                ) : (
                    <RequestForm onSubmit={onSubmit} disable={isPending}
                    departmentOptions={departmentsOptions} specialtyOptions={specialtiesOptions}/>
                )}
                
            </SheetContent>
        </Sheet>
    )
}