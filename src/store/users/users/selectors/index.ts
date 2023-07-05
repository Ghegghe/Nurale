import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../applicationStore";

export const getUsersState = (state: RootState)  => state.users

export const getUsersData = createSelector(
    getUsersState,
    (state)=>state.data
)