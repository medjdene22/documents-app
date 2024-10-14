import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getResetTokenByEmail } from "@/data/reset";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/db";
import { SendResetEmail, SendVerificationEmail } from "./mail";


export async function generateVerificationToken(email: string){
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getVerificationTokenByEmail(email)
    if (existingToken) {
        await prisma.verificationToken.delete({
            where: {
                token: existingToken.token
            }
        })
    }

    const newToken = await prisma.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    SendVerificationEmail(email, token)
    return newToken
}

 

export async function generateResetToken(email: string){
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getResetTokenByEmail(email)
    if (existingToken) {
        await prisma.passwordResetToken.delete({
            where: {
                token: existingToken.token
            }
        })
    }

    const newToken = await prisma.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    })


    SendResetEmail(email, token)
    return newToken
}