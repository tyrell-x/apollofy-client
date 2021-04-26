import { combineReducers } from "redux";

import authReducer from "./auth/auth-reducer";
import playerReducer from "./player/player-reducer.js";
import uploaderReducer from "./uploader/uploader-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  uploader: uploaderReducer,
  player: playerReducer,
});

export default rootReducer;
