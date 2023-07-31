import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../applicationStore";

export const getJobsState = (state: RootState)  => state.jobs

export const getJobsData = createSelector(
    getJobsState,
    (state)=>state.data
)
export const getJobsTotalCount = createSelector(
    getJobsState,
    (state)=>state.totalCount
)