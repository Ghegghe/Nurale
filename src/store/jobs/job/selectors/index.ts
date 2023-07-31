import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../applicationStore";

export const getJobState = (state: RootState)  => state.job

export const getJobData = createSelector(
    getJobState,
    (state)=>state.data
)