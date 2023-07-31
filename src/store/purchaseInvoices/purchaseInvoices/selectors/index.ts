import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../applicationStore";

export const getPurchaseInvoicesState = (state: RootState)  => state.purchaseInvoices

export const getPurchaseInvoicesData = createSelector(
    getPurchaseInvoicesState,
    (state)=>state.data
)
export const getPurchaseInvoicesTotalCount = createSelector(
    getPurchaseInvoicesState,
    (state)=>state.totalCount
)