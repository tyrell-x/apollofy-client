import { combineReducers } from "redux";

import authReducer from "./auth/auth-reducer";
import uploaderReducer from "./uploader/uploader-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  uploader: uploaderReducer
});

export default rootReducer;
