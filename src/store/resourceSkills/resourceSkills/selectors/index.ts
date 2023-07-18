import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../applicationStore";

export const getResourceSkillsState = (state: RootState)  => state.resourceSkills

export const getResourceSkillsData = createSelector(
    getResourceSkillsState,
    (state)=>state.data
)
export const getResourceSkillsTotalCount = createSelector(
    getResourceSkillsState,
    (state)=>state.totalCount
)