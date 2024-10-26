import { z } from "zod"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

import { insertRequestSchima } from '@/db/schema'
import {
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormField,
  } from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import Select from "@/components/select";
import { Textarea } from "@/components/ui/textarea"


const formSchema = insertRequestSchima.omit({
  id: true,
  status: true,
  userId: true,
  createdAt: true,
})

type FormValues = z.input<typeof formSchema>

type Props = {
    id?: string,
    defaultValues?: FormValues,
    onSubmit: (values : FormValues) => void
    onDelete?: () => void,
    disable?: boolean,
    departmentOptions: { label: string; value: string; }[],
    specialtyOptions: { label: string; value: string; }[],
};


export const RequestForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disable,
    departmentOptions,
    specialtyOptions,}: Props ) => {

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
      <FormField name="departmentId" control={form.control} render={({field}) => (
          <FormItem>
            <FormLabel>Department</FormLabel>
              <FormControl>
                <Select placeholder="Select a department" options={departmentOptions} disabled={disable}
                value={field.value} onChange={field.onChange}/>
              </FormControl>
              <FormMessage />
          </FormItem>
        )}
        />
        <FormField name="specialtyId" control={form.control} render={({field}) => (
          <FormItem>
            <FormLabel>Specialty</FormLabel>
              <FormControl>
                <Select placeholder="Select a Specialty" options={specialtyOptions} disabled={disable} 
                value={field.value} onChange={field.onChange}/>
              </FormControl>
              <FormMessage />
          </FormItem>
        )}
        />

        <FormField name="level" control={form.control} render={({field}) => (
          <FormItem>
            <FormLabel>Level</FormLabel>
              <FormControl>
                <Select placeholder="Select a level" options={[{label: "Licence 1", value: "l1"}, {label: "Licence 2", value: "l2"}, {label: "Licence 3", value: "l3"}, {label: "Master 1", value: "m1"}, {label: "Master 2", value: "m2"}]} disabled={disable}
                value={field.value} onChange={field.onChange}/>
              </FormControl>
              <FormMessage />
          </FormItem>
        )}
        />

        <FormField name="document" control={form.control} render={({field}) => (
          <FormItem>
            <FormLabel>Document</FormLabel>
              <FormControl>
                <Select placeholder="Select a document" options={[{label: "Licence 1", value: "l1"}, {label: "Licence 2", value: "l2"}, {label: "Licence 3", value: "l3"}, {label: "Master 1", value: "m1"}, {label: "Master 2", value: "m2"}]} disabled={disable}
                value={field.value} onChange={field.onChange}/>
              </FormControl>
              <FormMessage />
          </FormItem>
        )}
        />

        <FormField name="note" control={form.control} render={({field}) => (

          <FormItem>
            <FormLabel>Note</FormLabel>
            <FormControl>
              <Textarea {...field} value={field.value ?? ""} disabled={disable} placeholder="Optional nots"/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        
        <Button className="w-full" disabled={disable} type="submit">{id? "Save change" : "Craete Request"}</Button>
        {!!id &&
        <Button type="button" disabled={disable} onClick={handelDelete} className="w-full" variant='destructive' >
          <Trash className="size-4"/>
            <p className="pl-2">Delete Request</p>
        </Button>}

      </form>

    </Form>
  )
    
}

