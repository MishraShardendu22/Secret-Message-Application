import { z } from 'zod';

export const signInSchema = z.object({
    password: z
        .string()
        .min(8, { message: 'Password must be at least 6 characters' }),
    identifier: z
        .string()
})