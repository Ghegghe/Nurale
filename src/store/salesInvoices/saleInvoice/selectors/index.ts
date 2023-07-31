import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../applicationStore";

export const getSaleInvoiceState = (state: RootState)  => state.saleInvoice

export const getSaleInvoiceData = createSelector(
    getSaleInvoiceState,
    (state)=>state.data
)