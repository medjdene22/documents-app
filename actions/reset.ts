"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { generateResetToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { getResetTokenByToken } from "@/data/reset";
import prisma from "@/lib/db";
import { NewPasswordSchema, ResetSchema } from "@/schemas";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const { email } = validatedFields.data

    const existingUser = await getUserByEmail(email)
    if (!existingUser ) {
        return { error: "user does not exist" };
    }

    if (!existingUser.emailVerified){
        await generateResetToken(email)
        return { success: "Email not verified, Confirmation email sent" };
    } 

    await generateResetToken(email)

    return { success: "Reset password sent successfully" };
}

export const NewPassword = async (values : z.infer<typeof NewPasswordSchema>, token?: string | null) => {

    const validatedFields = NewPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    if (!token) {
        return { error: "Messing token!" };
    }

    const existingToken = await getResetTokenByToken(token)
    if (!existingToken) {
        return { error: "Invalid token!" };
    }

    const isExpired = existingToken.expires < new Date()
    if (isExpired) {
        return { success: "Token expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) {
        return { error: "Email does not exist" };
    }

    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10)

    await prisma.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword}
    })

    await prisma.passwordResetToken.delete({
        where: { id: existingToken.id }
    })

    return { success: "Password updated successfully", };
}