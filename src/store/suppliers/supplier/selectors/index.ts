import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../applicationStore";

export const getSupplierState = (state: RootState)  => state.supplier

export const getSupplierData = createSelector(
    getSupplierState,
    (state)=>state.data
)