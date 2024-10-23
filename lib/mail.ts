import nodemailer from 'nodemailer';
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 456,
    secure: true,
    auth: {
      user: SMTP_SERVER_USERNAME,
      pass: SMTP_SERVER_PASSWORD,
    },
  });

export async function SendVerificationEmail(email: string, token: string) {
    const confirmLink = `${process.env.NEXTAUTH_URL}/auth/verify?token=${token}`
    const mailOptions = {
        from: "documents request service <imad55777@gmail.com>",
        to: email,
        subject: 'Confirm your email',
        html: `<p>Please confirm your email by clicking <a href="${confirmLink}">here</a>.</p>`,
    }
    transporter.sendMail(mailOptions);
}

export async function SendResetEmail(email: string, token: string) {
    
    const confirmLink = `${process.env.NEXTAUTH_URL}/auth/new-password?token=${token}`
    const mailOptions = {
        from: "documents request service <imad55777@gmail.com>",
        to: email,
        subject: 'Reset your password',
        html: `<p>Please click <a href="${confirmLink}">here</a> to reset your password.</p>`,
    }
    transporter.sendMail(mailOptions);
}

