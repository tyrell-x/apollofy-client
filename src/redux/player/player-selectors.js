import { createSelector } from "reselect";

export const playerTracksSelector = createSelector(
  [(state) => state.player.tracks, (state) => state.tracks.tracksById],
  (playerTracks, allTracks) => playerTracks.map((track) => allTracks[track.id]),
);

export const playingTrackSelector = createSelector(
  [
    (state) => state.player.currentTrackIndex,
    (state) => state.player.tracks,
    (state) => state.tracks.tracksById,
  ],
  (id, playerTracks, allTracks) => allTracks[playerTracks[id]?.id],
);

export const tracksPlayingSelector = createSelector(
  [(state) => state.player.tracks],
  (tracks) => tracks.length,
);

export const currentlyPlayingSelector = createSelector(
  (state) => state.player.currentlyPlaying,
  (currentlyPlaying) => currentlyPlaying,
);

export const isTrackInPlayer = (id) =>
  createSelector(
    (state) => state.player.tracks,
    (tracks) => tracks.find((track) => track.id === id),
  );
