import { getServerSession } from "next-auth";
// we can extract data from session as we already injected it 

import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

// this is not the user we created this is givern by Next.JS
// import { User } from "next-auth";

export async function POST(request : Request){
    await dbConnect();

    const session = await getServerSession(authOptions)
    const user = session?.user ;

    if(!session || !session.user){
        return Response.json(
            {
                success : false,
                message : "User Not Authenticated"
            },
            {
                status : 500
            }
        )
    }
    const userId = user._id;
    const { acceptingMessages } = await request.json()
    
    try{
        const UpdatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { acceptingMessages },
            { new : true}
        )

        if(!UpdatedUser){
            return Response.json(
                {
                    success : false,
                    message : "User Not Found"
                },
                {
                    status : 404
                }
            )
        }
        return Response.json(
            {
                success : true,
                message : "Accepting Messages Updated",
                UpdatedUser
            },
            {
                status : 200
            }
        )

    }catch(error){
        return Response.json(
            {
                success : false,
                message : "Accepting Messsage Failed"
            },
            {
                status: 401
            }
        )
    }
}


export async function GET(){
    dbConnect();
    const session = await getServerSession(authOptions)
    const user = session?.user
    
    if(!session || !session.user){
        return Response.json(
            {
                success : false,
                message : "User Not Authenticated"
            },
            {
                status : 500
            }
        )
    }

    try {
        const foundUser = await UserModel.findById(user._id)

        if(!foundUser){
            return Response.json(
                {
                    success : false,
                    message : "User Not Found"
                },
                {
                    status : 404
                }
            )
        }

        return Response.json(
            {
                success : true,
                isAcceptingMessages : foundUser.isAcceptingMessages,
            },
            {
                status: 200
            }
        )

    }catch(error){
        console.error('Error retrieving message acceptance status:', error);
        return Response.json(
            { 
                success: false,
                message: 'Error retrieving message acceptance status' 
            },
            { 
                status: 500
            }
        );
    }
}
