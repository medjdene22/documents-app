import { db } from "@/db/drizzle"
import { verificationTokens } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getVerificationTokenByEmail(email: string){
    try {
        const [existingToken] = await db.select().from(verificationTokens)
            .where(eq(verificationTokens.email, email))
        return existingToken

    } catch (error) {
        return null
    }
}

export async function getVerificationTokenByToken(token: string){
    try {
        const [existingToken] = await db.select().from(verificationTokens)
            .where(eq(verificationTokens.token, token))
        return existingToken

    } catch (error) {
        return null
    }
}
  