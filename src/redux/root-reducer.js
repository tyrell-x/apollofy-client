import { combineReducers } from "redux";

import authReducer from "./auth/auth-reducer";
import playerReducer from "./player/player-reducer.js";
import uploaderReducer from "./uploader/uploader-reducer";
import tracksReducer from "./tracks/track-reducer"

const rootReducer = combineReducers({
  auth: authReducer,
  uploader: uploaderReducer,
  tracks: tracksReducer,
  player: playerReducer,
});

export default rootReducer;
