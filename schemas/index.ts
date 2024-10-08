import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "email is required"
    }),
    password: z.string().min(1, {
        message: "password is required"
    })
})

export const RegisterSchema = z.object({
    firstname: z.string().min(1, {
        message: "firstname is required"
    }),
    lastname: z.string().min(1, {
        message: "lastname is required"
    }),
    matricule: z.string().min(10, {
        message: "matricule lenth must contain at least 10"
    }),
    email: z.string().email({
        message: "email is required"
    }),
    password: z.string().min(6)
})