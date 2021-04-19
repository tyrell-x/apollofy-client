import { combineReducers } from "redux";

import authReducer from "./auth/auth-reducer";
import profileReducer from "./profile/profile-reducer"
const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer
});

export default rootReducer;
