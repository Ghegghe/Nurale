import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../applicationStore";

export const getPurchaseInvoiceActivityState = (state: RootState)  => state.purchaseInvoiceActivity

export const getPurchaseInvoiceActivityData = createSelector(
    getPurchaseInvoiceActivityState,
    (state)=>state.data
)