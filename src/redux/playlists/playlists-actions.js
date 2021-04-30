import * as PlaylistTypes from "./playlists-types";

import { signOutSuccess } from "../auth/auth-actions";

import playlistApi from "../../api/playlist-api";
import { normalizePlaylists } from "../../schema/playlist-schema";

import { getCurrentUserToken } from "../../services/auth";

export const playlistCreateRequest = () => ({
  type: PlaylistTypes.CREATE_PLAYLIST_REQUEST,
});

export const playlistCreateError = (message) => ({
  type: PlaylistTypes.CREATE_PLAYLIST_ERROR,
  payload: {
    message,
  },
});

export const playlistCreateSuccess = (playlists) => ({
  type: PlaylistTypes.CREATE_PLAYLIST_SUCCESS,
  payload: {
    playlists,
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

export function fetchAllPlaylists() {
  return async function fetchPlaylistsThunk(dispatch) {
    dispatch(fetchPlaylistRequest());

    try {
      const userToken = await getCurrentUserToken();

      if (!userToken) {
        console.log(userToken);
        return dispatch(signOutSuccess());
      }

      const res = await playlistApi.getAllPlaylists({
        Authorization: `Bearer ${userToken}`,
      });

      if (res.errorMessage) {
        return dispatch(fetchPlaylistsError(res.errorMessage));
      }

      const normalizedData = normalizePlaylists(res.data.data);
      console.log(normalizedData);
      return dispatch(
        fetchPlaylistsSuccess({
          ...normalizedData.entities.playlists,
        }),
      );
    } catch (err) {
      return dispatch(fetchPlaylistError(err));
    }
  };
}

export function createPlaylist({ title, thumbnail, publicAccessible }) {
  return async function createThunk(dispatch) {
    dispatch(playlistCreateRequest());

    try {
      const userToken = await getCurrentUserToken();

      if (!userToken) {
        return dispatch(signOutSuccess());
      }

      const res = await playlistApi.createPlaylist({
        body: {
          title: title,
          thumbnail: thumbnail,
          publicAccessible: publicAccessible,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (res.errorMessage) {
        return dispatch(playlistCreateError(res.errorMessage));
      }

      return dispatch(playlistCreateSuccess(res.data));
    } catch (err) {
      return dispatch(playlistCreateError(err));
    }
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
