/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import { usernameValidation } from "@/schemas/signUpSchema"

// makin a querry schema 
const UserNameQueryShcema = z.object({
    username: usernameValidation
});

export async function GET(request : Request){
    
    // just to make sure the request is correct and appropriate
    // this wont work according to me and chat gpt as get and post are treated seperately 
    // if we want to check for such cases the code for it is written at the end (its commented out) 
    // this would work in old system in case of pages router (legacy system)

    // if(request.method !== "GET"){
    //     return Response.json(
    //         {
    //             success: false,
    //             message : "This Method Is Not Allowed !!",
    //         },
    //         {
    //             status: 405,
    //         }
    //     )
    // }
    
    await dbConnect();
    try {
        const {searchParams} = new URL(request.url);
        // there willl be a lot of parameters like for eg :
        // http://localhost:3000/profile?username=shardendu&email=shardendu@example.com
        // username is shardendu mishra
        // email is shardendu@example.com
        const queryParam = {
            username: searchParams.get("username")
        }
        // VALIDATE WITH ZOD
        const result = UserNameQueryShcema.safeParse(queryParam)

        console.log("\nResult :",result," \n")
        
        if(!result.success){
            const usernameErrors = result.error
                .format()
                .username
                ?._errors || []
                return Response.json(
                    {
                        success: false,
                        message:
                            usernameErrors?.length > 0 ? usernameErrors.join(', ') : 'Invalid query parameters',
                    },
                    {
                        status: 400
                    }
                )
        }

        const { username } = result.data;
        console.log("Username :",username)
        
        // why is this incorrect syntax ?
        // const existingUserVerified = await UserModel.findOne(
        //     $match : {
        //         username : username,
        //         isVerified: true
        //     }
        // )

        // $match is used in MongoDB aggregation pipelines, not in simple queries like findOne.
        // In MongoDB, the findOne method expects an object with query conditions, 
        // not an aggregation pipeline (which would use $match).


        const existingUserVerified = await UserModel.findOne(
            {
                username,
                isVerified : true,
            }
        )

        if(existingUserVerified){
            return Response.json(
                {
                    success: false,
                    message: "Username already exists and is Verified, Please try another username !!"
                },
                {
                    status: 401
                }
            )
        }

        return Response.json(
            {
                success: true,
                message: "Username is unique"
            },
            {
                status: 200
            }
        )
        
    }catch(err){
        console.log("There was an Error Checking the UserName",err)
        return Response.json(
            {
                success: false,
                message: "Something went wrong"
            },
            {
                status: 500
            }
        )
    }
}


// code to handle all types of request in one single code block
// export async function handleRequest(request: Request) {
//     const method = request.method;

//     if (method === "POST") {
//         return Response.json(
//             {
//                 success: false,
//                 message: "This Method Is Not Allowed !!",
//             },
//             {
//                 status: 405,
//             }
//         );
//     }

//     if (method === "GET") {
//         await dbConnect();
//         try {
//             const { searchParams } = new URL(request.url);
//             const queryParam = { username: searchParams.get("username") };

//             const result = UserNameQueryShcema.safeParse(queryParam);

//             if (!result.success) {
//                 const usernameErrors = result.error.format().username?._errors || [];
//                 return Response.json(
//                     {
//                         success: false,
//                         message: usernameErrors.length > 0
//                             ? usernameErrors.join(", ")
//                             : "Invalid query parameters",
//                     },
//                     { status: 400 }
//                 );
//             }

//             const { username } = result.data;
//             const existingUserVerified = await UserModel.findOne({
//                 username,
//                 isVerified: true,
//             });

//             if (existingUserVerified) {
//                 return Response.json(
//                     {
//                         success: false,
//                         message: "Username already exists and is Verified, Please try another username !!",
//                     },
//                     { status: 401 }
//                 );
//             }

//             return Response.json(
//                 {
//                     success: true,
//                     message: "Username is unique",
//                 },
//                 { status: 200 }
//             );
//         } catch (err) {
//             console.log("There was an Error Checking the UserName", err);
//             return Response.json(
//                 {
//                     success: false,
//                     message: "Something went wrong",
//                 },
//                 { status: 500 }
//             );
//         }
//     }
// }