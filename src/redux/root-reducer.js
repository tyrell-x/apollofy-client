import { combineReducers } from "redux";

import authReducer from "./auth/auth-reducer";
import playerReducer from "./player/player-reducer.js";
import uploaderReducer from "./uploader/uploader-reducer";
import tracksReducer from "./tracks/track-reducer";
import playlistReducer from "./playlists/playlists-reducer.js";
import profileReducer from "./profile/profile-reducer"

const rootReducer = combineReducers({
  auth: authReducer,
  uploader: uploaderReducer,
  tracks: tracksReducer,
  playlists: playlistReducer,
  player: playerReducer,
  profile: profileReducer
});

export default rootReducer;
