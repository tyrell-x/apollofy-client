import { createSelector } from "reselect";

export const playerTracksSelector = createSelector(
  (state) => state.player,
  (tracks) => tracks,
);

export const currentTrackSelector = createSelector(
  (state) => state.player.currentTrackIndex,
  (state) => state.player.tracks,
  (currentTrackIndex, tracks) => tracks[currentTrackIndex]
);
