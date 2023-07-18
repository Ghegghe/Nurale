import { Supplier } from "../../../../utils";

export interface initialStateSuppliers {
    data: Supplier[],
    loading: boolean,
    error: string | null,
    totalCount: number
}

export interface SuppliersParams {
    skip: number
    take: number
    typeOfPaymentId?: string
}