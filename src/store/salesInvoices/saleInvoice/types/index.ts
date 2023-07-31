import { SaleInvoice } from "../../../../utils";

export interface InitialStateSaleInvoice {
    data: SaleInvoice | null,
    loading: boolean,
    error: string | null,
    pagination: number
}