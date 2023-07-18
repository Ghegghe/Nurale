import { PurchaseInvoiceActivity } from "../../../../utils";

export interface initialStatePurchaseInvoiceActivities {
    data: PurchaseInvoiceActivity[],
    loading: boolean,
    error: string | null,
    totalCount: number
}

export interface PurchaseInvoiceActivitiesParams {
    skip: number
    take: number
    purchasesInvoiceId?: number,
}