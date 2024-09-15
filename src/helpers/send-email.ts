// TRYIED USING EMAILJS-COM

// import type { NextApiRequest, NextApiResponse } from 'next';
// import emailjs from 'emailjs-com';

// const SERVICE_ID = 'service_tmsuxfs';
// const TEMPLATE_ID = 'template_aasx63r';
// const USER_ID = 'iDz3J2g2om61iQbpU';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         const { email, username, verifyCode } = req.body;

//         try {
//             const templateParams = {
//                 from_name: 'Acme',
//                 to_name: email,
//                 subject: 'Anonymous Feedback Application Verification Code',
//                 message: `Hi ${username}, your verification code is ${verifyCode}`,
//                 reply_to: 'shardendumishra01@example.com'
//             };

//             await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
//             res.status(200).json({ success: true, message: "Verification Email Sent Successfully" });
//         } catch (error) {
//             console.error('Error sending verification email:', error);
//             res.status(500).json({ success: false, message: 'Failed to send verification email.' });
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }