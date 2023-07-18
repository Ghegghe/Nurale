import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../applicationStore";

export const getResourcesState = (state: RootState)  => state.resources

export const getResourcesData = createSelector(
    getResourcesState,
    (state)=>state.data
)
export const getResourcesTotalCount = createSelector(
    getResourcesState,
    (state)=>state.totalCount
)