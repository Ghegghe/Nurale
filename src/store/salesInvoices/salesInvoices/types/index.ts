import { SaleInvoice } from "../../../../utils";

export interface initialStateSalesInvoices {
    data: SaleInvoice[],
    loading: boolean,
    error: string | null,
    totalCount: number
}
export interface SalesInvoicesParams {
    skip: number,
    take: number,
}