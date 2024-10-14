import prisma from "@/lib/db";

export async function getResetTokenByEmail(email: string){
    try {
        const passwordToken = await prisma.passwordResetToken.findFirst({
            where: { email }
        })
        return passwordToken

    } catch (error) {
        return null
    }
}

export async function getResetTokenByToken(token: string){
    try {
        const passwordToken = await prisma.passwordResetToken.findUnique({
            where: { token }
        })
        return passwordToken

    } catch (error) {
        return null
    }
}
  