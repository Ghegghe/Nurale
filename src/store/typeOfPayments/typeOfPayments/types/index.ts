import { TypeOfPayment } from "../../../../utils";

export interface initialStateTypeOfPayments {
    data: TypeOfPayment[],
    loading: boolean,
    error: string | null,
    totalCount: number
}
export interface TypeOfPaymentsParams {
    skip: number,
    take: number,
    hasEndOfMonth?: boolean
}