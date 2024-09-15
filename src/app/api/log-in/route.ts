// no idea wtf is this for absolutely no idea fuck this
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request : Request){
    await dbConnect();
    try{
        const { username, code } = await request.json();
        const decodedUsername = decodeURIComponent(username);
        const user = await UserModel.findOne(
            {
                username : decodedUsername
            }
        )
        if(!user){
            return Response.json(
                {
                    success : false,
                    message : "User Not Found !!"
                },
                {
                    status : 500,
                }
            )
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
        
        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true;
            await user.save();
            return Response.json(
                {
                    success : true,
                    messge : "Account Verified Successfully !!"
                },
                {
                    status : 200,
                }
            )
        }else if(!isCodeNotExpired){
            return Response.json(
                {
                    success : false,
                    messge : "Verified Code has expired please signup again to get a new code !!"
                },
                {
                    status : 405,
                }
            )
        }else{
            return Response.json(
                {
                    success : false,
                    messge : "Incorrect Verification Code"
                },
                {
                    status : 400,
                }
            )
        }

    }catch(error){
        console.log("There was an Error Checking the UserName",error)
        return Response.json(
            {
                success: false,
                message: "Error Checking Username"
            },
            {
                status: 500
            }
        )
    }

}