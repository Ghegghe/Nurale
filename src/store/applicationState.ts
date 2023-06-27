import {combineReducers} from "@reduxjs/toolkit";
import { authReducer } from "./Auth/reducer";

const rootReducer = combineReducers({
  auth: authReducer.reducer
})
export default rootReducer