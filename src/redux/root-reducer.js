import { combineReducers } from "redux";

import authReducer from "./auth/auth-reducer";
import counterReducer from "./reducers/counter";

const rootReducer = combineReducers({
  auth: authReducer,
  counter: counterReducer,
});

export default rootReducer;
