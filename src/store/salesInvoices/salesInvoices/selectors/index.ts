import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../applicationStore";

export const getSalesInvoicesState = (state: RootState)  => state.salesInvoices

export const getSalesInvoicesData = createSelector(
    getSalesInvoicesState,
    (state)=>state.data
)
export const getSalesInvoicesTotalCount = createSelector(
    getSalesInvoicesState,
    (state)=>state.totalCount
)