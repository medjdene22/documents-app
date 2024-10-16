"use client"

import { useState, useTransition } from "react"
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { settings } from "@/actions/settings"
import { LoginSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormItem,
    FormField,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useSession } from "next-auth/react"
import { SettingsSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";


export default function SettingsPage() {

    const user = useCurrentUser()

    const [isPending, startTransition] = useTransition()
    const {update} = useSession()

    const [error, setError] = useState< string | undefined >("")
    const [success, setSuccess] = useState< string | undefined >("")
    
    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || "",
            matricule: user?.matricule || ""
        },
    })

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            settings({
                matricule: values.matricule,
                name: values.name
            })
                .then((data) => {
                    setSuccess(data?.success)
                    setError(data?.error)
                    update()
                })
        })        
    }

    return (
        <Card className="bg-white w-[600px] shadow-xl rounded-xl"> 
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Setting Page
                </p>
            </CardHeader>
            <CardContent>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="FirstName lastname" type="text" disabled={isPending} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                    )}/>
                    <FormField control={form.control} name="matricule" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Matricule</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="202231234567" type="text" disabled={isPending} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                    )}/>
                    </div>
                    <div className="space-y-2">
                        <FormError message={error }/>
                        <FormSuccess message={success}/>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isPending}>Log in</Button>
                </form>
            </Form>

            </CardContent>
        </Card>
    )
}