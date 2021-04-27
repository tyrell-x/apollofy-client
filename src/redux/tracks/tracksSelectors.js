import { createSelector } from "reselect";

export const selectTracksState = (state) => state.tracks;
export const selectLikedTracksState = (state) => state.tracks.likedTracks;

export const tracksSelector = createSelector(
  [selectTracksState],
  (tracks) => tracks,
);

export const likedTracksSelector = createSelector(
    [selectLikedTracksState],
    (likedTracks) => likedTracks
)