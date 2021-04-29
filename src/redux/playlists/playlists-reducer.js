/* eslint-disable no-console */
/* eslint-disable spaced-comment */
import * as PlaylistType from "./playlist-types";

export const PlaylistInitState = {
  playlistCreation: false,
  playlistCreationError: null,
  playlistUpdate: false,
  playlistUpdateError: null,
  playlistsLoading: false,
  playlistsLoadingError: null,
  playlistsFetched: false,
  playlistLoading: false,
  playlistLoadingError: null,
  playlistFetched: false,
  playlistsByID: {},
};

const PlaylistReducer = (state = PlaylistInitState, action) => {
  switch (action.type) {
    case PlaylistType.CREATE_PLAYLIST_REQUEST: {
      return {
        ...state,
        playlistCreation: true,
        playlistCreationError: null,
      };
    }
    case PlaylistType.CREATE_PLAYLIST_ERROR: {
      const { message } = action.payload;
      return {
        ...state,
        playlistCreation: false,
        playlistCreationError: message,
      };
    }
    case PlaylistType.CREATE_PLAYLIST_SUCCESS: {
      return {
        ...state,
        playlistCreation: false,
        playlistCreationError: null,
      };
    }
    case PlaylistType.UPDATE_PLAYLIST_REQUEST: {
      return {
        ...state,
        playlistUpdate: true,
        playlistUpdateError: null,
      };
    }
    case PlaylistType.UPDATE_PLAYLIST_ERROR: {
      return {
        ...state,
        playlistUpdate: false,
        playlistUpdateError: action.payload,
      };
    }
    case PlaylistType.UPDATE_PLAYLIST_SUCCESS: {
      return {
        ...state,
        playlistUpdate: false,
        playlistUpdateError: null,
      };
    }
    case PlaylistType.FETCH_PLAYLISTS_REQUEST: {
      return {
        ...state,
        playlistsLoading: true,
        playlistsLoadingError: null,
      };
    }
    case PlaylistType.FETCH_PLAYLISTS_ERROR: {
      return {
        ...state,
        playlistsLoading: false,
        playlistsLoadingError: action.payload,
      };
    }
    case PlaylistType.FETCH_PLAYLISTS_SUCCESS: {
      return {
        ...state,
        playlistsLoading: false,
        playlistsLoadingError: null,
        playlistsFetched: true,
        playlistsByID: {
          ...state.playlistsByID,
          ...action.payload.playlists,
        },
      };
    }
    case PlaylistType.FETCH_PLAYLIST_REQUEST: {
      return {
        ...state,
        playlistLoading: true,
        playlistLoadingError: null,
      };
    }
    case PlaylistType.FETCH_PLAYLIST_ERROR: {
      return {
        ...state,
        playlistLoading: false,
        playlistLoadingError: action.payload,
      };
    }
    case PlaylistType.FETCH_PLAYLIST_SUCCESS: {
      const {id, playlist} = action.payload.playlist;

      return {
        ...state,
        playlistLoading: false,
        playlistLoadingError: null,
        playlistFetched: true,
        playlistsByID: {
          ...state.playlistsByID,
          [id]: {
            ...playlist,
          },
        },
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default PlaylistReducer;
