import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcryptjs from "bcryptjs";
import {sendVerificationEmail} from "@/helpers/sendVerificationEmail";
import { NextResponse } from "next/server";

// if we try get method we get this error since
// we didnt create a get method 
// 405 Method Not Allowed

export async function POST(request: Request) {
    // Can be moved outside the function as well,
    // which would be useful if we had GET or PATCH requests.
    await dbConnect();

    try {
        const { username, email, password } = await request.json();

        // Check if the user already exists
        // If the user exists with same same username
        const existingVerifiedUserByUsername = await UserModel.findOne({
            username,
            isVerified: true,
        });

        // if the user exists with the same username and is also verified
        if (existingVerifiedUserByUsername) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Username already exists and is Verified, Please try another username !!",
                },
                {
                    status: 401,
                }
            );
        }

        // check if user exist by the email given 
        const existingUserByEmail = await UserModel.findOne({ email });
        const verifyCode = Math.floor(Math.random() * 900000 + 100000).toString();

        // if the user exists who has the given email
        if (existingUserByEmail){
            
            // if the user is already verified
            if (existingUserByEmail.isVerified) {
                // return an error if the existing is also verified
                return NextResponse.json(
                    {
                        success: false,
                        message: "Email already exists and is Verified, Please try another email !!",
                    },
                    {
                        status: 401,
                    }
                );  
            } else {
                const hashedPassword = await bcryptjs.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }
        } else {
            // if the email given doesent exist in the first palce 
            const hashedPassword = await bcryptjs.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            // create a new user object 
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: [],
            });

            // save the new user
            await newUser.save();
        }

        // Send verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        );

        if (!emailResponse.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: emailResponse.message,
                },
                {
                    status: 500,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'User registered successfully. Please verify your account.',
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.log("There was an Error, something went wrong Try Again !!", error);
        return NextResponse.json(
            {
                success: false,
                message: "There was an Error making the request, something went wrong Try Again !!",
            },
            {
                status: 500,
            }
        );
    }
}