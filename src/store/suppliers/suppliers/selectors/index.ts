import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../applicationStore";

export const getSuppliersState = (state: RootState)  => state.suppliers

export const getSuppliersData = createSelector(
    getSuppliersState,
    (state)=>state.data
)
export const getSuppliersTotalCount = createSelector(
    getSuppliersState,
    (state)=>state.totalCount
)