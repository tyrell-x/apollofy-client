import * as PlaylistTypes from "./playlists-types";

import playlistApi from "../../api/playlist-api";
import { normalizePlaylists } from "../../schema/playlist-schema";
import { normalizeTracks } from "../../schema/track-schema.js";
import { addTracks } from "../tracks/track-actions.js";

export const playlistCreateRequest = () => ({
  type: PlaylistTypes.CREATE_PLAYLIST_REQUEST,
});

export const playlistCreateError = (message) => ({
  type: PlaylistTypes.CREATE_PLAYLIST_ERROR,
  payload: {
    message,
  },
});

export const playlistCreateSuccess = (playlist) => ({
  type: PlaylistTypes.CREATE_PLAYLIST_SUCCESS,
  payload: {
    playlist,
  },
});

export const playlistUpdateRequest = () => ({
  type: PlaylistTypes.UPDATE_PLAYLIST_REQUEST,
});

export const playlistUpdateError = (message) => ({
  type: PlaylistTypes.UPDATE_PLAYLIST_ERROR,
  payload: { message },
});

export const playlistUpdateSuccess = (playlist) => ({
  type: PlaylistTypes.UPDATE_PLAYLIST_SUCCESS,
  payload: { playlist },
});

export const fetchPlaylistsRequest = () => ({
  type: PlaylistTypes.FETCH_PLAYLISTS_REQUEST,
});

export const fetchPlaylistsError = (message) => ({
  type: PlaylistTypes.FETCH_PLAYLISTS_ERROR,
  payload: { message },
});

export const fetchPlaylistsSuccess = (playlists) => ({
  type: PlaylistTypes.FETCH_PLAYLISTS_SUCCESS,
  payload: { playlists },
});

export const fetchPlaylistRequest = () => ({
  type: PlaylistTypes.FETCH_PLAYLIST_REQUEST,
});

export const fetchPlaylistError = (message) => ({
  type: PlaylistTypes.FETCH_PLAYLIST_ERROR,
  payload: { message },
});

export const fetchPlaylistSuccess = (id, playlist) => ({
  type: PlaylistTypes.FETCH_PLAYLIST_SUCCESS,
  payload: { id, playlist },
});

export const updateTracksInPlaylist = (trackId, playlistId) => ({
  type: PlaylistTypes.UPDATE_PLAYLIST_TRACKS,
  payload: { playlistId, trackId },
});

export const updatePlaylistFollowing = (id, followed) => ({
  type: PlaylistTypes.UPDATE_PLAYLIST_FOLLOWING,
  payload: { id, followed },
});

export function fetchAllPlaylists() {
  return async function fetchPlaylistsThunk(dispatch) {
    dispatch(fetchPlaylistRequest());

    try {
      const res = await playlistApi.getAllPlaylists();

      if (res.errorMessage) {
        return dispatch(fetchPlaylistsError(res.errorMessage));
      }

      const normalizedData = normalizePlaylists(res.data);

      const tracks = normalizeTracks(
        res.data.flatMap((playlist) => playlist.tracks),
      ).entities.tracks;
      dispatch(addTracks(tracks));

      const playlists = Object.fromEntries(
        Object.entries(normalizedData.entities.playlists).map(
          ([key, value]) => [
            key,
            {
              ...value,
              tracks: value.tracks.map((track) => track._id),
            },
          ],
        ),
      );
      return dispatch(fetchPlaylistsSuccess(playlists));
    } catch (err) {
      return dispatch(fetchPlaylistError(err));
    }
  };
}

export function createPlaylist({ title }) {
  return async function createThunk(dispatch) {
    dispatch(playlistCreateRequest());
    try {
      const res = await playlistApi.createPlaylist({ title: title });
      if (res.errorMessage) {
        return dispatch(playlistCreateError(res.errorMessage));
      }
      return dispatch(playlistCreateSuccess(res.data));
    } catch (err) {
      return dispatch(playlistCreateError(err));
    }
  };
}
export function addTrackToPlaylist(trackId, playlistId) {
  return async function addTrackToPlaylistThunk(dispatch) {
    const response = await playlistApi.addTrackToPlaylist(trackId, playlistId);
    dispatch(updateTracksInPlaylist(trackId, playlistId));
  };
}

export function followPlaylist(id, follow) {
  return async function followPlaylistThunk(dispatch) {
    await playlistApi.followPlaylist(id, follow);
    dispatch(updatePlaylistFollowing(id, follow));
  };
}
/*
export function updatePlaylist(playlist) {
  return async function updatePlaylistThunk(dispatch) {
    dispatch(playlistUpdateRequest());

    const res = await api.updatePlaylist(playlist);

    if (res.isSuccessful) {
      dispatch(playlistUpdateSuccess(res.data));
    } else {
      dispatch(playlistUpdateError(res.errorMessage));
    }
  };
}
*/
/*
export function fetchOwnPlaylists() {
  return async function fetchPlaylistsThunk(dispatch) {
    dispatch(fetchPlaylistRequest());

    const res = await api.getOwnPlaylists();

    if (res.isSuccessful) {
      const normalizedPlaylists = normalizePlaylists(res.data);
      dispatch(
        fetchPlaylistSuccess({
          type: playlistTypes.OWN,
          byID: normalizedPlaylists.entities.playlists,
          ids: {
            OWN: normalizedPlaylists.result,
          },
        }),
      );
    } else {
      dispatch(fetchPlaylistError(res.errorMessage));
    }
  };
}

export function fetchFollowingPlaylists() {
  return async function fetchPlaylistsThunk(dispatch) {
    dispatch(fetchPlaylistsRequest());

    const res = await api.getFollowingPlaylists();

    if (res.isSuccessful) {
      const normalizedPlaylists = normalizePlaylists(res.data);
      dispatch(
        fetchPlaylistsSuccess({
          type: playlistTypes.FOLLOWING,
          byID: normalizedPlaylists.entities.playlists,
          ids: normalizedPlaylists.result,
        }),
      );
    } else {
      dispatch(fetchPlaylistsError(res.errorMessage));
    }
  };
}

export function fetchPopularPlaylists() {
  return async function fetchPlaylistsThunk(dispatch) {
    dispatch(fetchPlaylistsRequest());

    const res = await api.getPopularPlaylists();

    if (res.isSuccessful) {
      const normalizedPlaylists = normalizePlaylists(res.data);
      dispatch(
        fetchPlaylistsSuccess({
          type: playlistTypes.POPULAR,
          byID: normalizedPlaylists.entities.playlists,
          ids: normalizedPlaylists.result,
        }),
      );
    } else {
      dispatch(fetchPlaylistsError(res.errorMessage));
    }
  };
}

export function fetchPlaylistById(playlistID) {
  return async function fetchPlaylistThunk(dispatch) {
    dispatch(fetchPlaylistRequest());

    const res = await api.getPlaylistById(playlistID);

    if (res.isSuccessful) {
      dispatch(fetchPlaylistSuccess(res.data));
    } else {
      dispatch(fetchPlaylistError(res.errorMessage));
    }
  };
}
*/
