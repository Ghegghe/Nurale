import { z } from "zod";

export const schema = z
    .object({
        email: z.coerce.string().email({ message: 'Email non valida' }),
        lastName: z.coerce.string().min(5, {message: 'errore'}),
        firstName: z.coerce.string().min(5, {message: 'errore'}),
        password: z.coerce.string().min(8, {message: 'errore'}),
        passwordConfirm: z.coerce.string().min(8, {message: 'errore'})
    })
    .refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Le password non corrispondono',
    })