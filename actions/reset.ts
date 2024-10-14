"use server";

import { ResetSchema } from "@/schemas";
import * as z from "zod";
import { generateResetToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";

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