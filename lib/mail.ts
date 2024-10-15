import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function SendVerificationEmail(email: string, token: string) {
    const confirmLink = `${process.env.NEXTAUTH_URL}/auth/verify?token=${token}`
    const verificationMail = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: 'Confirm your email',
        html: `<p>Please confirm your email by clicking <a href="${confirmLink}">here</a>.</p>`,
    })

}

export async function SendResetEmail(email: string, token: string) {
    
    const confirmLink = `${process.env.NEXTAUTH_URL}/auth/new-password?token=${token}`
    const resetMail = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: 'Reset your password',
        html: `<p>Please click <a href="${confirmLink}">here</a> to reset your password.</p>`,
    })
}

