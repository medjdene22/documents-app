"use server"

import * as z from "zod"
import { SettingsSchema } from "@/schemas"
import { db } from "@/db/drizzle"
import { currentUser } from "@/lib/auth-lib"
import { getUserById } from "@/data/user"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export const settings = async (values: z.infer<typeof SettingsSchema>) => {

    const user = await currentUser()
    if(!user || !user.id) return { error: "You are not logged in" }

    const existingUser = await getUserById(user.id)
    if (!existingUser) return { error: "user does not exist" };

    await db.update(users).set({
        ...values})
        .where(eq(users.id, existingUser.id))

    return { success: "Settings updated" };
}    