import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
  } from "@/components/ui/sheet"
import { useNewDepartment } from "../hooks/use-new-department"
import { DepartmentForm } from "./department-form";
import { insertDepartmentSchima } from "@/db/schema";
import { z } from "zod";
import { useCreateDepartment } from "../api/use-create-department";

export const NewDepartmentSheet = () =>{
    
    const formSchema = insertDepartmentSchima.pick({
        name: true,
    })
    
    type FormValues = z.input<typeof formSchema>
    
    const {isOpen, onClose} = useNewDepartment();

    const mutation = useCreateDepartment();

    const onSubmit = (values : FormValues) =>{
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        }
        );
    }

    return(
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        New Department
                    </SheetTitle>
                    <SheetDescription>
                        Create a new department to add specialty to
                    </SheetDescription>
                </SheetHeader>
                <DepartmentForm onSubmit={onSubmit} disable={mutation.isPending}/>
            </SheetContent>
        </Sheet>
    )
}