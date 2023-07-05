import {combineReducers} from "@reduxjs/toolkit";
import { authReducer } from "./Auth/reducer";
import { usersReducer } from "./users/users/reducer";
import { userReducer } from "./users/user";

const rootReducer = combineReducers({
  auth: authReducer.reducer,
  users: usersReducer.reducer,
  user: userReducer.reducer,
})
export default rootReducer