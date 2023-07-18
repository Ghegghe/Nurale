import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../applicationStore";

export const getResourceState = (state: RootState)  => state.resource

export const getResourceData = createSelector(
    getResourceState,
    (state)=>state.data
)