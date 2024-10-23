"use server";

import { db } from "@/db/drizzle";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { users } from "@/db/schema";

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

    await db.insert(users)
        .values(
            {name: name,
            matricule: matricule,
            email: email,
            password: hashedPassword
        })

    await generateVerificationToken(email)

    //send email

    return { success: "Confirmation email sent!" };

}