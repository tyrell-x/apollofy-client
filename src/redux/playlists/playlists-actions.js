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

export const addPlaylists = (playlists) => {
  return async (dispatch) => {
    if(!playlists.length) {
      return;
    }
    
    let normalizedPlaylists = normalizePlaylists(playlists);
    dispatch(addTracks(playlists.flatMap((playlist) => playlist.tracks)));

    normalizedPlaylists = Object.fromEntries(
      Object.entries(normalizedPlaylists.entities.playlists).map(
        ([key, value]) => [
          key,
          {
            ...value,
            tracks: value.tracks.map((track) => track._id),
          },
        ],
      ),
    );
    return dispatch(fetchPlaylistsSuccess(normalizedPlaylists));
  }
}

export function fetchAllPlaylists() {
  return async function fetchPlaylistsThunk(dispatch) {
    dispatch(fetchPlaylistsRequest());

    await new Promise(resolve => setTimeout(resolve, 300))

    const res = await playlistApi.getAllPlaylists();

    if (!res.isSuccessful) {
      return dispatch(fetchPlaylistsError(res.errorMessage));
    }

    return dispatch(addPlaylists(res.data));
  };
}

export const playlistDeleteRequest = (message) => ({
  type: PlaylistTypes.DELETE_PLAYLIST_REQUEST,
  payload: {
    message,
  },
});

export const playlistDeleteError = (message) => ({
  type: PlaylistTypes.DELETE_PLAYLIST_ERROR,
  payload: {
    message,
  },
});

export const playlistDeleteSuccess = (message) => ({
  type: PlaylistTypes.DELETE_PLAYLIST_SUCCESS,
  payload: {
    message,
  },
});

export const playlistDeletePostSuccess = (message) => ({
  type: PlaylistTypes.DELETE_PLAYLIST_POST_SUCCESS,
  payload: {
    message,
  },
});

export const editPlaylist = (id, data) => ({
  type: PlaylistTypes.UPDATE_PLAYLIST,
  payload: {
    id: id,
    playlist: data,
  },
});

export function createPlaylist({ title }) {
  return async function createThunk(dispatch) {
    dispatch(playlistCreateRequest());
    const res = await playlistApi.createPlaylist({ title: title });
    if (!res.isSuccessful) {
      return dispatch(playlistCreateError(res.errorMessage));
    }
    return dispatch(playlistCreateSuccess(res.data));
  };
}

export function addTrackToPlaylist(trackId, playlistId) {
  return async function addTrackToPlaylistThunk(dispatch) {
    const response = await playlistApi.addTrackToPlaylist(trackId, playlistId);
    if(!response.isSuccessful) {
      return;
    }
    dispatch(updateTracksInPlaylist(trackId, playlistId));
  };
}

export function followPlaylist(id, follow) {
  return async function followPlaylistThunk(dispatch) {
    await playlistApi.followPlaylist(id, follow);
    dispatch(updatePlaylistFollowing(id, follow));
  };
}

export function updatePlaylist(playlist) {
  return async function updatePlaylistThunk(dispatch) {
    dispatch(playlistUpdateRequest());
    dispatch(playlistUpdateSuccess(playlist));
    try {
      const res = await playlistApi.updatePlaylist(playlist);
      if(!res.isSuccessful) {
        dispatch(playlistUpdateError(res.errorMessage));
      }
    } catch (err) {
      dispatch(playlistUpdateError(err));
    }
  };
}

export function deletePlaylist(playlistId) {
  return async function deletePlaylistThunk(dispatch) {
    dispatch(playlistDeleteRequest());

    try {
      const res = await playlistApi.deletePlaylist(playlistId);
      dispatch(playlistDeleteSuccess(playlistId));
    } catch (err) {
      dispatch(playlistDeleteError(err));
    }
  };
}

export function deleteUnsuccess() {
  return {
    type: PlaylistTypes.DELETE_UNSUCCESS
  };
}

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
  