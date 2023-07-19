import { z } from "zod";

export const schema = z
    .object({
        firstName: z.coerce.string().min(5, {message: 'errore'}),
        lastName: z.coerce.string().min(5, {message: 'errore'}),
        hourCost: z.coerce.number().min(0, {message: 'errore'}),
        hourRevenue: z.coerce.number().min(0, {message: 'errore'}),
        curriculumVitae: z.coerce.number().min(0, {message: 'errore'}),
        note: z.coerce.string().min(5, {message: 'errore'}),
    })
