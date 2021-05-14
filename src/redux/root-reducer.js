import { combineReducers } from "redux";

import authReducer from "./auth/auth-reducer";
import playerReducer from "./player/player-reducer";
import uploaderReducer from "./uploader/uploader-reducer";
import tracksReducer from "./tracks/track-reducer";
import playlistReducer from "./playlists/playlists-reducer";
import finderReducer from "./finder/finder-reducer"

const rootReducer = combineReducers({
  auth: authReducer,
  uploader: uploaderReducer,
  tracks: tracksReducer,
  playlists: playlistReducer,
  player: playerReducer,
  finder: finderReducer
});

export default rootReducer;
