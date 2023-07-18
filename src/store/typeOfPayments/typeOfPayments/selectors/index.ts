import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../applicationStore";

export const getTypeOfPaymentsState = (state: RootState)  => state.typeOfPayments

export const getTypeOfPaymentsData = createSelector(
    getTypeOfPaymentsState,
    (state)=>state.data
)
export const getTypeOfPaymentsTotalCount = createSelector(
    getTypeOfPaymentsState,
    (state)=>state.totalCount
)