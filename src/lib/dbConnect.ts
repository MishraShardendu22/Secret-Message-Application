/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';

// isConnected is optional thats why we use "?."
type ConnectionObject = {
    isConnected ?: number;
}

const connection : ConnectionObject = {};

// void here means that we dont care what type of value does the fucntion return 
async function dbConnect() : Promise<void>{
    // check if already connected
    if(connection.isConnected){
        console.log("\nAlready Connected to Data-Base !! \n");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '',{});
        console.log("\ndb\n");
        connection.isConnected = db.connections[0].readyState;
        
        // console.log("\nDatabase object:\n", db);
        // console.log("\nFirst connection object:\n", db.connections[0]);
        // console.log("\nDatabase ready state:\n", db.connections[0].readyState);
        console.log("\nConnected to Data-Base !!\n");
    }catch(error){
        console.log("\nError Connecting to Data-Base !!\n",error);
        // exit gracefully
        process.exit(1);
    }
}


export default dbConnect;