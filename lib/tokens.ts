import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getResetTokenByEmail } from "@/data/reset";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/db/drizzle";
import { SendResetEmail, SendVerificationEmail } from "./mail";
import { PasswordResetToken, verificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function generateVerificationToken(email: string){
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getVerificationTokenByEmail(email)
    if (existingToken) {
        await db.delete(verificationTokens).where(eq(verificationTokens.token, existingToken.token))
    }

    const [newToken] = await db.insert(verificationTokens)
        .values(
            {email, token, expires}
        ).returning()

    SendVerificationEmail(email, token)
    return newToken
}

 

export async function generateResetToken(email: string){
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getResetTokenByEmail(email)
    if (existingToken) {
        await db.delete(PasswordResetToken).where(eq(PasswordResetToken.token, existingToken.token))
    }

    const [newToken] = await db.insert(PasswordResetToken)
        .values(
            {email, token, expires}
        ).returning()


    SendResetEmail(email, token)
    return newToken
}