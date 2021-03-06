import { createSelector } from "reselect";

export const selectTracksStore = createSelector(
  [(state) => state.tracks],
  (tracksStore) => tracksStore,
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

export const selectRandomTracks = (number) => {
  return createSelector(selectAllTracks, (tracks) => {
    const tracksCopy = [...tracks];
    const randomTracks = [];
    for (let i = 0; i < number; i++) {
      randomTracks.push(
        tracksCopy.splice(
          Math.floor(Math.random() * tracksCopy.length),
          1,
        )[0] || {},
      );
    }
    return randomTracks;
  });
};

export const selectTrackCollection = (name) =>
  createSelector(
    (state) => state.tracks.trackCollections[name],
    (trackCollections) => trackCollections,
  );

export const selectFilteredTrackIds = (filterFn = () => true) =>
  createSelector(
    [(state) => state.tracks.tracksById, (state) => state.auth.currentUser],
    (tracks, uid) => {
      return Object.entries(tracks)
      .filter((track) => filterFn(track[1], uid))
      .map((track) => track[0]);
    }
  );

export const selectFilteredTrackIdsAndName = (filterFn = () => true) =>
  createSelector(
    [(state) => state.tracks.tracksById, (state) => state.auth.currentUser],
    (tracks, uid) =>
      Object.entries(tracks)
        .filter((track) => filterFn(track[1], uid))
        .map((track) => ({
          id: track[0],
          title: track[1].title,
        })),
  );

export const selectAllTrackIds = selectFilteredTrackIds();
export const selectLikedTrackIds = selectFilteredTrackIds(
  (track, uid) => track.likedBy.includes(uid),
);
export const selectOwnedTrackIds = selectFilteredTrackIds(
  (track, uid) => track.ownedBy === uid,
);
