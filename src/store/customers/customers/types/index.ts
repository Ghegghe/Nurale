import { Customer } from "../../../../utils";

export interface initialStateCustomers {
    data: Customer[],
    loading: boolean,
    error: string | null,
    totalCount: number
}

export interface CustomerParams {
    skip: number
    take: number
    typeOfPaymentId?: string
}