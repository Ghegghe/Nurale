import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../applicationStore";

export const getCustomerState = (state: RootState)  => state.customer

export const getCustomerData = createSelector(
    getCustomerState,
    (state)=>state.data
)