import { createSelector } from "reselect";

export const selectPlaylistStore = createSelector(
  [(state) => state.playlists],
  (playlistsStore) => playlistsStore,
);

export const selectPlaylist = (id) =>
  createSelector(
    (state) => state.playlists.playlistsById[id],
    (state) => state.tracks.tracksById,
    (playlist, tracks) => ({
      ...(playlist || {}),
      tracks: ((playlist || {}).tracks || []).map((id) => tracks[id]),
    }),
  );

export const selectAllPlaylists = createSelector(
  (state) => state.playlists.playlistsById,
  (tracksObj) => Object.values(tracksObj),
);

export const selectOwnedPlaylists = createSelector(
  (state) => state.playlists.playlistsById,
  (tracksObj) => Object.values(tracksObj).filter((playlist) => playlist.owned),
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
export const selectFollowedPlaylistsIds = selectFilteredPlaylistsIds(
  (playlist) => playlist.followed,
);

export const selectLastPlaylist = createSelector(
  (state) => state.playlists.playlistsById,
  (state) => state.tracks.tracksById,
  (playlists, tracks) => {
    const lastPlaylist =
      Object.values(playlists).sort((a, b) => {
        const aCreatedAt = new Date(a.createdAt);
        const bCreatedAt = new Date(b.createdAt);
        return bCreatedAt - aCreatedAt;
      })[0] || {};
    return {
      ...lastPlaylist,
      tracks: (lastPlaylist.tracks || []).map((id) => tracks[id]),
    };
  },
);
