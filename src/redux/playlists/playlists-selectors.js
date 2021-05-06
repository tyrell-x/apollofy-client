import { createSelector } from "reselect";

export const selectPlaylistStore = createSelector(
  [(state) => state.playlists],
  (playlistsStore) => playlistsStore,
);

export const selectPlaylist = (id) =>
  createSelector(
    (state) => state.playlists.playlistsById[id],
    (playlists) => playlists,
  );

export const selectAllPlaylists = createSelector(
  (state) => state.playlists.playlistsById,
  (tracksObj) => Object.values(tracksObj),
);

const filterPlaylistSelector = (filterFn) => (playlist) => {
  return filterFn(playlist);
};

export const selectFilteredPlaylistsIds = (filterFn = () => true) =>
  createSelector(
    (state) => state.playlists.playlistsById,
    (playlists) =>
      Object.entries(playlists)
        .filter((playlist) => filterPlaylistSelector(filterFn)(playlist[1]))
        .map((playlist) => playlist[0]),
  );

export const selectAllPlaylistsIds = selectFilteredPlaylistsIds();
export const selectLikedPlaylistsIds = selectFilteredPlaylistsIds(
  (playlist) => playlist.liked,
);
export const selectOwnedPlaylistsIds = selectFilteredPlaylistsIds(
  (playlist) => playlist.owned,
);
