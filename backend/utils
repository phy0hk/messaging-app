import { reset } from 'nodemon';

const nodemailer = require('nodemailer');

// create a transpoter using SMTP host

const trasnporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// email sender function
const sendPasswordResetEmail = async(email, resetLink) => {
    try {
        const mailOption = {
            from: 'Chat app support: support@gmail.com',
            to: email, // user or receiver email
            subject: 'Password Reset Request',
            html: `
                <p>You requested a password reset for your account.</p>
                <p>Click the link below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>This link is valid for 1 hour.</p>
                <p>If you did not request this, please ignore this email.</p>
            `
        };

        await trasnporter.sendMail(mailOption);
        console.log('Password reset sent to: ', email);
    } catch(err) {
        console.error('Error sending email', err);
        throw new Error('Fail to send email.');
    }
};

module.exports = sendPasswordResetEmail;