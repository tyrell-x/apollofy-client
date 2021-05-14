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

export function createPlaylist({ title }) {
  return async function createThunk(dispatch) {
    dispatch(playlistCreateRequest());
    const res = await playlistApi.createPlaylist({ title: title });
    if (!res.isSuccessful) {
      return dispatch(playlistCreateError(res.errorMessage));
    }
    console.log(res)
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
    const res = await playlistApi.updatePlaylist(playlist);
    if(!res.isSuccessful) {
      dispatch(playlistUpdateError(res.errorMessage));
    }
  };
}