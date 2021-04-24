import * as PlayersTypes from "./player-types";

export const addPlayer = (track) => ({
  type: PlayersTypes.ADD_PLAYER_TRACK,
  payload: track
});

export const removePlayer = () => ({
  type: PlayersTypes.REMOVE_PLAYER_TRACK,
});
