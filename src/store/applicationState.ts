import {combineReducers} from "@reduxjs/toolkit";
import { authReducer } from "./Auth/reducer";
import { usersReducer } from "./users/users";
import { userReducer } from "./users/user";
import { skillsReducer } from "./skills/skills";
import { skillReducer } from "./skills/skill";

const rootReducer = combineReducers({
  auth: authReducer.reducer,
  users: usersReducer.reducer,
  user: userReducer.reducer,
  skills: skillsReducer.reducer,
  skill: skillReducer.reducer
})
export default rootReducer