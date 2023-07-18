import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../applicationStore";

export const getPurchaseInvoiceActivitiesState = (state: RootState)  => state.purchaseInvoiceActivities

export const getPurchaseInvoiceActivitiesData = createSelector(
    getPurchaseInvoiceActivitiesState,
    (state)=>state.data
)
export const getPurchaseInvoiceActivitiesTotalCount = createSelector(
    getPurchaseInvoiceActivitiesState,
    (state)=>state.totalCount
)