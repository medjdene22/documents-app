"use server";
import prisma from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { generateVerificationToken } from "@/lib/tokens";

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

    await prisma.user.update({
        where: { id: existingUser.id },
        data: { emailVerified: new Date(), email: existingToken.email }
    })

    await prisma.verificationToken.delete({
        where: { id: existingToken.id }
    })

    return { success: "Email verified!" }
}