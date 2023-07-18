import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../applicationStore";

export const getResourceSkillState = (state: RootState)  => state.resourceSkill

export const getResourceSkillData = createSelector(
    getResourceSkillState,
    (state)=>state.data
)