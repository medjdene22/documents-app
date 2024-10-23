"use client"

import { useState, useTransition } from "react";
import { CardWarrper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { NewPasswordSchema } from "@/schemas";
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
import { NewPassword } from "@/actions/reset";
import { useSearchParams } from "next/navigation";


export function NewPasswordForm (){

    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [ isPending, startTransition] = useTransition()
    const [error, setError] = useState< string | undefined >("")
    const [success, setSuccess] = useState< string | undefined >("")

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            NewPassword(values, token)
            .then((data) => {
                    setSuccess(data?.success)
                    setError(data?.error)
            })
        })
        
    }

    return(
        <CardWarrper  headerLabel={"Entre your new password"} backButtonLabel={"Back to login"} backButtonHerf={"/auth/login"}>
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-4">
                    <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="********" type="password" disabled={isPending}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                    )}/>
                    
                    </div>
                    <div className="space-y-2">
                        <FormError message={error }/>
                        <FormSuccess message={success}/>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isPending}>Reset password</Button>
                </form>
            </Form>

        </CardWarrper>
    )

}