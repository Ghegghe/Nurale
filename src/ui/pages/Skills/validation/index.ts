import { z } from "zod";

export const schema = z
    .object({
        name: z.coerce.string().min(5, {message: 'errore'}),
        skillType: z.coerce.string().min(5, {message: 'errore'}),
        note: z.coerce.string().min(5, {message: 'errore'}),
    })
