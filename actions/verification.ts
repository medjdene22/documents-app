"use server";
import { db } from "@/db/drizzle";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { generateVerificationToken } from "@/lib/tokens";
import { users, verificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function verifyToken(token: string) {

    const existingToken = await getVerificationTokenByToken(token)
    if (!existingToken) {
        return { error: "Invalid token" };
    }

    const isExpired = existingToken.expires < new Date()
    if (isExpired) {
        await generateVerificationToken(existingToken.email)
        return { success: "Token expired, a new one has been sent" };
    }

    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) {
        return { error: "Email does not exist" };
    }

    await db.update(users).set({
        emailVerified: new Date()
    }).where(eq(users.id, existingUser.id))

    await db.delete(verificationTokens).where(eq(verificationTokens.token, existingToken.token))

    return { success: "Email verified!" }
}