import { createSelector } from "reselect";

export const selectTracksStore = createSelector(
  [(state) => state.tracks],
  (tracksState) => tracksState,
);

export const selectTrack = (id) =>
  createSelector(
    (state) => state.tracks.tracksById[id],
    (track) => track,
  );

export const selectAllTracks = createSelector(
  (state) => state.tracks.tracksById,
  (tracksObj) => Object.values(tracksObj),
);

export const selectTrackCollection = (name) =>
  createSelector(
    (state) => state.tracks.trackCollections[name],
    (trackCollections) => trackCollections,
  );

const filterTrackSelector = (filterFn) => (track) => {
  return filterFn(track);
};

export const selectFilteredTrackIds = (filterFn = () => true) =>
  createSelector(
    (state) => state.tracks.tracksById,
    (tracks) =>
      Object.entries(tracks)
        .filter((track) => filterTrackSelector(filterFn)(track[1]))
        .map((track) => track[0]),
  );

export const selectAllTrackIds = selectFilteredTrackIds();
export const selectLikedTrackIds = selectFilteredTrackIds(
  (track) => track.liked,
);
export const selectOwnedTrackIds = selectFilteredTrackIds(
  (track) => track.owned,
);
