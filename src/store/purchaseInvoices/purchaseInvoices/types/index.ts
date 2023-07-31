import { PurchaseInvoice } from "../../../../utils";

export interface initialStatePurchaseInvoices {
    data: PurchaseInvoice[],
    loading: boolean,
    error: string | null,
    totalCount: number
}
export interface PurchaseInvoicesParams {
    skip: number,
    take: number,
}