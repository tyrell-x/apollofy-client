import { combineReducers } from "redux";

import authReducer from "./auth/auth-reducer";
import uploaderReducer from "./uploader/uploader-reducer";
import tracksReducer from "./tracks/track-reducer"

const rootReducer = combineReducers({
  auth: authReducer,
  uploader: uploaderReducer,
  tracks: tracksReducer
});

export default rootReducer;
