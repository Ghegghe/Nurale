import { PurchaseInvoiceActivity } from "../../../../utils";

export interface InitialStatePurchaseInvoiceActivity {
    data: PurchaseInvoiceActivity | null,
    loading: boolean,
    error: string | null,
    pagination: number
}