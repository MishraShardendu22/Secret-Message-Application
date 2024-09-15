/* eslint-disable @typescript-eslint/no-unused-vars */
import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
// using our custom made email template

import { ApiResponse } from "@/types/ApiResponse";
// sending custom made API response to the user


// email should be written first , then username 
// this was causeing an error and sending email to the username
// export async function sendVerificationEmail(username : string,verifyCode : string) : Promise<ApiResponse> 

// this is right , the error was found while debugging
export async function sendVerificationEmail(email : string,username : string,verifyCode : string) : Promise<ApiResponse> {
    try{
        console.log("Sending Code")
        console.log(verifyCode)
        // console.log(resend.emails)
        await resend.emails.send({
            // from: 'shardendumishra01@gmail.com',
            from: 'Acme <onboarding@resend.dev>',
            to: "shardendumishra01@gmail.com",
            subject: 'Anonymous Feedback Application Verification Code',
            react: VerificationEmail(
                { 
                    username, 
                    otp: verifyCode 
                }
            ),
        });
        console.log("\nCode Sent to",email,"\n");
        console.log("\nCode for ",username,"\n");
        return {success : true, message : "Verification Email Sent Sucessfully"};        
    }catch(error){
        console.error('Error sending verification email:', error);
        return { success: false, message: 'Failed to send verification email.' };
    }
}

// Will Try using nodemailer / fxing the one below
// Tried Integrating EmailJS but it was not working at the moment for me
// import emailjs from 'emailjs-com';
// import { ApiResponse } from '@/types/ApiResponse';

// const SERVICE_ID = 'x';
// const TEMPLATE_ID = 'x';
// const USER_ID = 'x';

// export async function sendVerificationEmail(email: string, username: string, verifyCode: string): Promise<ApiResponse> {
//     try {
//         const templateParams = {
//             to_name: email,
//             username: username,
//             otp: verifyCode,
//             reply_to: 'shardendumishra01@example.com'
//         };

//         await emailjs.send(SERVICE_ID,TEMPLATE_ID, templateParams);
//         return { success: true, message: "Verification Email Sent Successfully" };
//     } catch (error) {
//         console.error('Error sending verification email:', (error as Error).message);
//         return { success: false, message: 'Failed to send verification email.' };
//     }
// }