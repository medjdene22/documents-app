"use server";

import { signIn } from "@/auth"
import { DEFAUT_LOGIN_REDIRECT } from "@/route";

import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";



export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const { email, password } = validatedFields.data

    try {
        const session = await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAUT_LOGIN_REDIRECT
        })
        return { success: "You are logged in" }
    } catch (error) {
        if (error instanceof AuthError) {
            
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid email or password" };
                default:
                    return { error: "Something went wrong" }; 
            }
            
        }
        throw error
    }
}