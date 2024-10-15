import prisma from "@/lib/db";

export async function getVerificationTokenByEmail(email: string){
    try {
        const existingToken = await prisma.verificationToken.findFirst({
            where: { email }
        })
        return existingToken

    } catch (error) {
        return null
    }
}

export async function getVerificationTokenByToken(token: string){
    try {
        const existingToken = await prisma.verificationToken.findUnique({
            where: { token }
        })
        return existingToken

    } catch (error) {
        return null
    }
}
  