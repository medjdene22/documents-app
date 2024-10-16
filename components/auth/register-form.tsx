"use client"

import { useState, useTransition } from "react";
import { CardWarrper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { RegisterSchema } from "@/schemas";
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
import { register } from "@/actions/register";


export function RegisterForm(){

    const [ isPending, startTransition] = useTransition()
    const [error, setError] = useState< string | undefined >("")
    const [success, setSuccess] = useState< string | undefined >("")

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            matricule: "",
            email: "",
            password: ""
        },
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {

        setError("")
        setSuccess("")

        startTransition(() => {
            register(values)
            .then(res => {
                setSuccess(res.success)
                setError(res.error)
            })
        })
        
    }

    return(
        <CardWarrper  headerLabel={"Create an account"} backButtonLabel={"you do have account?"} backButtonHerf={"/auth/login"} showSocial>
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="FIRSTNAME lastname" type="text" disabled={isPending}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                    )}/>
                    
                    <FormField control={form.control} name="matricule" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Matricule</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="202431234567" type="text" disabled={isPending}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                    )}/>
                    <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="moh@exmple.com" type="email" disabled={isPending}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                    )}/>
                    
                    <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="********" type="password" disabled={isPending}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                    )}/>
                    </div>
                    <div className="space-y-2">
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isPending}>Create an account</Button>
                </form>
            </Form>

        </CardWarrper>
    )

}