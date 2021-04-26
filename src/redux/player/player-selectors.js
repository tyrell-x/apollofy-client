import { createSelector } from "reselect";

export const playerTracksSelector = createSelector(
  (state) => state.player,
  (tracks) => tracks,
);