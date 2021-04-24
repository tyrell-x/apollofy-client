import { combineReducers } from "redux";

import authReducer from "./auth/auth-reducer";
import PlayersReducer from "./player/player-reducer.js";

const rootReducer = combineReducers({
  auth: authReducer,
  player: PlayersReducer,
});

export default rootReducer;
