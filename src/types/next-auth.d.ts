import 'next-auth';


// here we are modifying the existing types of next-auth
// we are doing this 
// so JWT and session can have additional information 
declare module 'next-auth' {
    // declare module is a special type of file
    // to modify built-in module we do it like this 
    // in package we directly decalre it 
    // but if wan entire package to be aware of this change that we make 
    // then we do it using "declare module"

    // affects "user" in JWT token
     interface User {
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username?: string;
    } 
    
    // affects "session.user.__Some_Field__"
    interface Session {
        user: {
            _id?: string;
            isVerified?: boolean;
            isAcceptingMessages?: boolean;
            username?: string;
        } & DefaultSession['user'];
    }

}

// You're not using DefaultSession['user'] in the User interface because the User interface is for adding custom fields like _id, isVerified, and username. These fields aren't part of the default user structure that NextAuth provides.
// For the Session interface, you're using DefaultSession['user'] because you still want to keep the default fields like name, email, and image along with the new custom ones.

// In simple terms:

// User is customized to include extra information from your database (like _id, isVerified).
// Session keeps both the default user information (like name and email) and your extra fields (like _id and username).
// This way, you get the extra info where needed without losing the default data NextAuth provides for sessions.



// another syntax of doing what is being done above 
// Sample : 
// declare module 'next-auth/jwt' {
//     interface JWT {
//         _id?: string;
//         isVerified?: boolean;
//         isAcceptingMessages?: boolean;
//         username?: string;
//     }
// }