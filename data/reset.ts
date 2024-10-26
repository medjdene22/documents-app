import { db } from "@/db/drizzle"
import { PasswordResetToken } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getResetTokenByEmail(email: string){
    try {
        const [passwordToken] = await db.select().from(PasswordResetToken)
            .where(eq(PasswordResetToken.email, email))
        return passwordToken

    } catch (error) {
        return null
    }
}

export async function getResetTokenByToken(token: string){
    try {
        const [passwordToken] = await db.select().from(PasswordResetToken)
            .where(eq(PasswordResetToken.token, token))
        return passwordToken

    } catch (error) {
        return null
    }
}
  