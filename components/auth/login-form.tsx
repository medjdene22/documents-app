"use client"

import { useSearchParams } from "next/navigation"
import { useState, useTransition } from "react";
import { CardWarrper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { LoginSchema } from "@/schemas";
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
import { login } from "@/actions/login";
import Link from "next/link";


export function LoginForm(){

    const searchParams = useSearchParams()
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with defferent provider" : ""
    const [ isPending, startTransition] = useTransition()
    const [error, setError] = useState< string | undefined >("")
    const [success, setSuccess] = useState< string | undefined >("")

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            login(values)
            .then((data) => {
                    setSuccess(data?.success)
                    setError(data?.error)
            })
        })
        
    }

    return(
        <CardWarrper  headerLabel={"Welcome back"} backButtonLabel={"Dont have an account?"} backButtonHerf={"/auth/register"} showSocial>
            
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
                    <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="********" type="password" disabled={isPending}/>
                                </FormControl>
                                <Button size="sm" variant="link" asChild className="px-1">
                                    <Link href="/auth/reset">Forgot password?</Link>
                                </Button>
                                <FormMessage/>
                            </FormItem>
                    )}/>
                    </div>
                    <div className="space-y-2">
                        <FormError message={error || urlError}/>
                        <FormSuccess message={success}/>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isPending}>Log in</Button>
                </form>
            </Form>

        </CardWarrper>
    )

}