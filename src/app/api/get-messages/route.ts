/* eslint-disable @typescript-eslint/no-unused-vars */
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import mongoose from 'mongoose';
import { User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const _user: User = session?.user;
  
    if (!session || !_user) {
      return new Response(
        JSON.stringify({ success: false, message: 'Not authenticated' }),
        { status: 401 }
      );
    }
  
    const userId = new mongoose.Types.ObjectId(_user._id);
  
    try {
      // Check if the user exists
      const userExists = await UserModel.findById(userId).exec();
  
      if (!userExists) {
        return new Response(
          JSON.stringify({ message: 'User not found', success: false }),
          { status: 404 }
        );
      }
  
      // Perform the aggregation, ensuring that empty message arrays are handled
      const user = await UserModel.aggregate([
        { $match: { _id: userId } },
        { $unwind: { path: '$messages', preserveNullAndEmptyArrays: true } }, // Preserve users with empty message arrays
        { $sort: { 'messages.createdAt': -1 } },
        { $group: { _id: '$_id', messages: { $push: '$messages' } } },
      ]).exec();
  
      if (!user || user.length === 0) {
        return new Response(
          JSON.stringify({ message: 'No messages found', success: true }),
          { status: 200 }
        );
      }
  
      return new Response(
        JSON.stringify({ messages: user[0].messages, success: true }),
        { status: 200 }
      );
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      return new Response(
        JSON.stringify({ message: 'Internal server error', success: false }),
        { status: 500 }
      );
    }
  }
  

// import dbConnect from "@/lib/dbConnect";
// import mongoose from "mongoose";
// import { getServerSession } from "next-auth";
// import UserModel from "@/model/User";
// import { authOptions } from "../auth/[...nextauth]/options";
// import { User } from "next-auth";

// export async function GET(request : Request){
//     await dbConnect();
    
//     const session = await getServerSession(authOptions)
//     const user = session?.user
    
//     if(!session || !session.user){
//         return Response.json(
//             {
//                 success : false,
//                 message : "User Not Authenticated"
//             },
//             {
//                 status : 500
//             }
//         )
//     }
//     // Aggregation pipelining in MongoDB is used to perform complex data processing and transformations on collections. \
//     // It's a powerful framework for filtering, grouping, transforming, and summarizing data in a sequence of stages, similar to how pipelines in Linux process streams of data step by step. 
//     // Each stage in an aggregation pipeline performs a specific operation and passes the output to the next stage.
//     // Aggregation pipelining is not strictly necessary in MongoDB, but it is highly optimized for specific tasks like complex querying, data transformation, and reporting. 
//     // While you can sometimes achieve similar results using basic MongoDB queries, manual processing in your application, or alternative approaches, aggregation pipelines often provide a more efficient and concise way to handle complex data operations.

//     const userId = new mongoose.Types.ObjectId(user._id);

//     try {
//         const user = await UserModel.aggregate([
//             { $match : { _id : userId } }, // first pipeline stage
//             { $unwind : "$messages" },
//             { $sort: { 'messages.createdAt': -1 } },
//             { $group : {_id : userId, messages: { $push: '$messages'}}}
//         ]).exec();

//         if (!user || user.length === 0) {
//             return Response.json(
//                 { message: 'User not found', success: false },
//                 { status: 404 }
//             );
//         }

//         return Response.json(
//             {
//                 success : true,
//                 messages : user[0].messages
//             },
//             {
//                 status : 200
//             }
//         )
//     }catch(error){
//         console.error('An unexpected error occurred:', error);
//         return Response.json(
//             { message: 'Internal server error', success: false },
//             { status: 500 }
//         );
//     }
// }