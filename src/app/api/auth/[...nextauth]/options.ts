/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error('No user found with this email');
          }
          if (!user.isVerified) {
            throw new Error('Please verify your account before logging in');
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error('Incorrect password');
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); // Convert ObjectId to string
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
};


// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcryptjs from "bcryptjs";
// import UserModel from "@/model/User";
// import dbConnect from "@/lib/dbConnect";

// export const authOptions : NextAuthOptions = {
//     providers: [
//         CredentialsProvider({
//             // id and name are genrally represented in the same way 
//             // they dont have much use
//             id: 'credentials',
//             name: 'Credentials',

//             // eg.) when we use github credentials it automatically generates a button to connect to github
//             // The credentials is used to generate a suitable form on the sign in page.
//             // You can specify whatever fields you are expecting to be submitted.
//             credentials: {
//                 email     : { label : 'Email'    , type : 'text' },
//                 password  : { label : 'Password' , type : 'password' },
//             },

//             // since this is custom authentication system 
//             // we need to write our own authorize function
//             async authorize(credentials: any): Promise<any> {
//                 // we cant just authorize credentials
//                 // we need to check the credenials in the database
//                 await dbConnect();
//                 try {
//                     const user = await UserModel.findOne({
//                         // we need to find the user in 
//                         // the database using either username or email
//                         $or: [
//                             { email: credentials.identifier.email },
//                             { username: credentials.identifier.username },
//                         ],
//                     });

//                     // if no such user exist we throw an error
//                     if (!user) {
//                         throw new Error('No user found with this email');
//                     }

//                     // if user exist but is not verified
//                     // then also we throw an error 
//                     if (!user.isVerified) {
//                         throw new Error('Please verify your account before logging in');
//                     }
                    
//                     // finally we have a verified user
//                     // we need to check credentials with submitted password
//                     const isPasswordCorrect = await bcryptjs.compare(credentials.password,user.password);
                    
//                     // if password is correct we return the user
//                     // if password is incorrect we throw an error
//                     if (isPasswordCorrect) {
//                         return user;
//                     } else {
//                         throw new Error('Incorrect password');
//                     }
//                 } catch (err: any) {
//                     throw new Error(err);
//                 }
//             },
//         }),
//     ],


//     // here we are modifying the jwt and session
//     // we are doing this so 
//     // token and session can be used to store user data
//     // this is so we dont have to call database again and again
//     // this increases the payload 
//     // but if we dont do this then 
//     // we have to call database again and again which can choke the system
//     callbacks : {
//         // with jwt we have to return "token" 
//         // if we dont it will cause an error  
//         async jwt({token, user}) {
//             if (user) {
//                 token._id = user._id?.toString();
//                 token.isVerified = user.isVerified;
//                 token.isAcceptingMessages = user.isAcceptingMessages;
//                 token.username = user.username;
//             }
//             return token;
//         },
//         // with session we have to return "session" 
//         // if we dont it will cause an error  
//         async session({session, token}){
//             if(token){
//                 session.user._id = token._id;
//                 session.user.isVerified = token.isVerified;
//                 session.user.isAcceptingMessages = token.isAcceptingMessages;
//                 session.user.username = token.username;
//             }            
//             return session;
//         }
//         // check the /types/next-auth.d.ts file

//         // by doing this to token and session
//         // we can get all the data from it
//         // even we have any one of them 
//     },

//     // jwt : bearer strategy = if u have token u are logged in
//     // databse : key is stored and based on it we allow user to login
//     session : {
//         strategy : 'jwt',
//     },

//     secret : process.env.NEXTAUTH_SECRET,
    
//     // overwrite pages so auth js handles it automatically
//     pages : {
//         signIn : '/sign-in'
//     }
// }