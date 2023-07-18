import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../applicationStore";

export const getCustomersState = (state: RootState)  => state.customers

export const getCustomersData = createSelector(
    getCustomersState,
    (state)=>state.data
)
export const getCustomersTotalCount = createSelector(
    getCustomersState,
    (state)=>state.totalCount
)