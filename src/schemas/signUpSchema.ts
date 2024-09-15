import {z} from 'zod';

// check validation of username 
export const usernameValidation = z
  .string()
  .min(2, 'Username must be at least 2 characters')
  .max(20, 'Username must be no more than 20 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');


export const signUpSchema = z.object({
    username: usernameValidation,
    // email: emailValidation,
    email: z
        .string()
        .email({ message: 'Invalid email address' }),

    // password : passwordValidation,
    password: z
        .string()
        .min(8, { message: 'Password must be at least 6 characters' }),
});

// didnt convert to object 
// because it checks a single field 

// could also be done like 
// export const emailValidation = z
//     .string()
//     .email({message : "Email is not valid, Try Again"});


// could also be done like 
// export const passwordValidation = z
//     .string()
//     .min(8, { message: 'Password must be at least 6 characters' });


// export const signUpSchema = z.object({
//     username : usernameValidation,
//     email : emailValidation,
//     password : passwordValidation
// })