import { createSelector } from "reselect";

export const selectTrackIds = (type) => createSelector(
  state => state.tracks.ids[type],
  trackIds => trackIds
)

export const selectTrack = (id) => createSelector(
  state => state.tracks.byID[id],
  track => track
)
