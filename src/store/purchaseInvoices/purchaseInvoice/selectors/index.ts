import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../applicationStore";

export const getPurchaseInvoiceState = (state: RootState)  => state.purchaseInvoice

export const getPurchaseInvoiceData = createSelector(
    getPurchaseInvoiceState,
    (state)=>state.data
)