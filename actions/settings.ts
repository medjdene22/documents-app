"use server"

import * as z from "zod"
import { SettingsSchema } from "@/schemas"
import prisma from "@/lib/db"
import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth-lib"

export const settings = async (values: z.infer<typeof SettingsSchema>) => {

    const user = await currentUser()
    if(!user || !user.id) return { error: "You are not logged in" }

    const existingUser = await getUserById(user.id)
    if (!existingUser) return { error: "user does not exist" };

    await prisma.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            ...values
        }
    })

    return { success: "Settings updated" };
}    