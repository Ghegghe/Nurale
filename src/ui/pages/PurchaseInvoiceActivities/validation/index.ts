import { z } from "zod";

export const schema = z
    .object({
        name: z.coerce.string().min(5, {message: 'errore'}),
        daysToFirstPayment: z.number().min(0, {message: 'errore'}),
        daysBetweenPayments: z.number().min(0, {message: 'errore'}),
        numberOfPayments: z.number().min(0, {message: 'errore'}),
        daysOffsetPayments: z.number().min(0, {message: 'errore'}),
        note: z.coerce.string().min(5, {message: 'errore'}),
    })
