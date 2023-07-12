import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../applicationStore";

export const getSkillsState = (state: RootState)  => state.skills

export const getSkillsData = createSelector(
    getSkillsState,
    (state)=>state.data
)