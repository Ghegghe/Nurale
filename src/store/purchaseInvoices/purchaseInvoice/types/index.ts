import { PurchaseInvoice } from "../../../../utils";

export interface InitialStatePurchaseInvoice {
    data: PurchaseInvoice | null,
    loading: boolean,
    error: string | null,
    pagination: number
}