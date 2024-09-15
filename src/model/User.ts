// these are for mongoose validation only 
import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
} 

const MessageSchema: Schema<Message> = new Schema(
    {
        content: {
            type: String,
            required: [true, "This is a required field"]
        },
        createdAt: {
            type: Date,
            required: [true, "This is a required field"],
            default: Date.now
        }
    }
);

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    isVerified: boolean;
    verifyCodeExpiry: Date;
    isAcceptingMessages: boolean;
    messages: Message[];
} 

const UserSchema: Schema<User> = new Schema(
    {
        username: {
            type: String,
            trim: true,
            unique: true,
            required: [true, "This is a required field"]
        },
        email: {
            type: String,
            required: [true, "This is a required field"],
            unique: true,
            match: [/.+\@.+\..+/, 'Please use a valid email address'],
        },
        password: {
            type: String,
            required: [true, "This is a required field"]
        },
        verifyCode: {
            type: String,
            required: [true, "This is a required field"]
        },
        verifyCodeExpiry: {
            type: Date,
            required: [true, "This is a required field"]
        },
        isAcceptingMessages: {
            type: Boolean,
            default: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        messages: [MessageSchema]
    }
);

const UserModel = 
        (mongoose.models.User as mongoose.Model<User>) 
     || (mongoose.model<User>("User", UserSchema));


export default UserModel;

// The syntax is correct, but there are some minor points you may want to address:

// TypeScript type definitions: You're using TypeScript, so it is important to ensure your Message and User interfaces align with the way you're applying them in Mongoose schemas.
// Messages array in UserSchema: While it is correct to use [MessageSchema] for subdocuments, ensure that TypeScript correctly understands that messages is an array of Message.
// That aside, the code looks valid overall. Mongoose will handle the schemas properly, and it should work as expected.