"use client"

import { useState, useTransition } from "react";
import { CardWarrper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { ResetSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormItem,
    FormField,
    FormLabel,
    FormMessage
} from "../ui/form"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { reset } from "@/actions/reset";


export function ResetForm (){

    const [ isPending, startTransition] = useTransition()
    const [error, setError] = useState< string | undefined >("")
    const [success, setSuccess] = useState< string | undefined >("")

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            reset(values)
            .then((data) => {
                    setSuccess(data?.success)
                    setError(data?.error)
            })
        })
        
    }

    return(
        <CardWarrper  headerLabel={"Reset your password"} backButtonLabel={"Back to login"} backButtonHerf={"/auth/login"}>
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-4">
                    <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="moh@exmple.com" type="email" disabled={isPending}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                    )}/>
                    
                    </div>
                    <div className="space-y-2">
                        <FormError message={error }/>
                        <FormSuccess message={success}/>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isPending}>Send reset email</Button>
                </form>
            </Form>

        </CardWarrper>
    )

}