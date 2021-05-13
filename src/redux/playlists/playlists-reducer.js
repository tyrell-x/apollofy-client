/* eslint-disable no-console */
/* eslint-disable spaced-comment */
import * as PlaylistType from "./playlists-types";

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
  playlistsById: {},
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
      const { playlist } = action.payload;
      return {
        ...state,
        playlistCreation: false,
        playlistCreationError: null,
        playlistsById: {
          ...state.playlistsById,
          [playlist._id]: playlist,
        },
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
      const { playlist } = action.payload;
      return {
        ...state,
        playlistUpdate: false,
        playlistUpdateError: null,
        playlistsById: {
          ...state.playlistsById,
          [playlist._id]: playlist,
        },
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
        playlistsById: {
          ...state.playlistsById,
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
      const { id, playlist } = action.payload.playlist;

      return {
        ...state,
        playlistLoading: false,
        playlistLoadingError: null,
        playlistFetched: true,
        playlistsById: {
          ...state.playlistsById,
          [id]: {
            ...playlist,
          },
        },
      };
    }
    case PlaylistType.UPDATE_PLAYLIST_TRACKS: {
      const { trackId, playlistId } = action.payload;
      return {
        ...state,
        playlistsById: {
          ...state.playlistsById,
          [playlistId]: {
            ...state.playlistsById[playlistId],
            tracks: [...state.playlistsById[playlistId].tracks, trackId],
          },
        },
      };
    }
    case PlaylistType.UPDATE_PLAYLIST_FOLLOWING: {
      const { id, followed } = action.payload;
      return {
        ...state,
        playlistsById: {
          ...state.playlistsById,
          [id]: {
            ...state.playlistsById[id],
            followed: followed,
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
