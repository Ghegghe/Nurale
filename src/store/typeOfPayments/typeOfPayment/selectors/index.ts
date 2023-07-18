import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../applicationStore";

export const getTypeOfPaymentState = (state: RootState)  => state.typeOfPayment

export const getTypeOfPaymentData = createSelector(
    getTypeOfPaymentState,
    (state)=>state.data
)