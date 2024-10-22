import { z } from "zod"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

import { insertSpecialtiesSchima } from '@/db/schema'
import {
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormField,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Select from "@/components/select";

const formSchema = insertSpecialtiesSchima.omit({
  id: true
})

type FormValues = z.input<typeof formSchema>

type Props = {
    id?: string,
    defaultValues?: FormValues,
    onSubmit: (values : FormValues) => void
    onDelete?: () => void,
    disable?: boolean,
    departmentOptions: { label: string; value: string; }[],
    onCreateDepartment: (name: string) => void,
};


export const SpecialtieForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disable,
    departmentOptions,
    onCreateDepartment,
}:Props ) => {

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const handleSubmit = (values: FormValues) => {
      onSubmit({...values,})
    }

    const handelDelete = () => {
        onDelete?.() 
    }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
        <FormField name="name" control={form.control} render={({field}) => (

          < FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={disable} placeholder="ex: isil" {...field} />
              </FormControl>
              <FormMessage />
          </FormItem>
        )}
        />
        <FormField name="departmentId" control={form.control} render={({field}) => (
          <FormItem>
            <FormLabel>Department</FormLabel>
              <FormControl>
                <Select placeholder="Select an Department" options={departmentOptions} disabled={disable} 
                value={field.value} onChange={field.onChange} onCreate={onCreateDepartment}/>
              </FormControl>
              <FormMessage />
          </FormItem>
        )}
        />
        
        <Button className="w-full" disabled={disable} type="submit">{id? "Save change" : "Craete Specialtie"}</Button>
        {!!id &&
        <Button type="button" disabled={disable} onClick={handelDelete} className="w-full" variant='destructive' >
          <Trash className="size-4"/>
            <p className="pl-2">Delete Specialtie</p>
        </Button>}

      </form>

    </Form>
  )
    
}

