"use server";

import prisma from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {

    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const {email, name, matricule, password } = validatedFields.data

    const hashedPassword = await bcrypt.hash(password, 10)

    if (await getUserByEmail(email)) {
        return { error: "Email already exists" };
    }

    const user = await prisma.user.create({
        data: {
            email: email,
            name: name,
            matricule: matricule,
            password: hashedPassword
        }
    })

    const verificationToken = await generateVerificationToken(email)

    //send email

    return { success: "Confirmation email sent!" };

}