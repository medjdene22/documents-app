"use server";

import prisma from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";


export const register = async (values: z.infer<typeof RegisterSchema>) => {

    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const {email, firstname, lastname, matricule, password } = validatedFields.data

    const hashedPassword = await bcrypt.hash(password, 10)

    

    if (await getUserByEmail(email)) {
        return { error: "Email already exists" };
    }

    const user = await prisma.user.create({
        data: {
            email: email,
            firstname: firstname,
            lastname: lastname,
            matricule: matricule,
            password: hashedPassword
        }
    })

    //send email

    return { success: "account created" };

}