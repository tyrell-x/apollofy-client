import * as TrackTypes from "./track-types";

export const TrackInitState = {
  tracksLoading: false,
  tracksLoadingError: null,
  tracksFetched: false,
  trackLoading: false,
  trackLoadingError: null,
  trackFetched: false,
  tracksById: {},
  trackCollections: {},
};

const TrackReducer = (state = TrackInitState, action) => {
  switch (action.type) {
    case TrackTypes.UPDATE_TRACK: {
      const { id, track } = action.payload;
      return {
        ...state,
        tracksById: {
          ...state.tracksById,
          [id]: {
            ...state.tracksById[id],
            ...track,
          },
        },
      };
    }
    case TrackTypes.FETCH_TRACKS_REQUEST: {
      return {
        ...state,
        tracksLoading: true,
        tracksLoadingError: null
      };
    }
    case TrackTypes.FETCH_TRACKS_ERROR: {
      return {
        ...state,
        tracksLoading: false,
        tracksLoadingError: action.payload,
      };
    }
    case TrackTypes.FETCH_TRACKS_SUCCESS: {
      const fetchType = action.payload.type;
      return {
        ...state,
        tracksLoading: false,
        tracksFetched: true,
        tracksLoadingError: null,
        tracksById: {
          ...state.tracksById,
          ...action.payload.tracksById,
        },
        trackCollections: {
          ...state.trackCollections,
          [fetchType]: [...action.payload.trackCollections],
        },
      };
    }
    case TrackTypes.FETCH_TRACK_REQUEST: {
      return {
        ...state,
        trackLoading: true,
        trackLoadingError: null,
      };
    }
    case TrackTypes.FETCH_TRACK_ERROR: {
      return {
        ...state,
        trackLoading: false,
        trackLoadingError: action.payload,
      };
    }
    case TrackTypes.FETCH_TRACK_SUCCESS: {
      const trackID = action.payload._id;
      return {
        ...state,
        trackLoading: false,
        trackFetched: true,
        trackLoadingError: null,
        tracksById: {
          ...state.tracksById,
          [trackID]: action.payload,
        },
      };
    }
    case TrackTypes.ADD_TRACKS: {
      const { tracks } = action.payload;
      return {
        ...state,
        tracksById: {
          ...state.tracksById,
          ...tracks,
        },
      };
    }
    case TrackTypes.UPDATE_LIKE_TRACK: {
      const { id, liked } = action.payload;
      return {
        ...state,
        tracksById: {
          ...state.tracksById,
          [id]: {
            ...state.tracksById[id],
            liked: liked,
          },
        },
      };
    }
    case TrackTypes.REMOVE_TRACK: {
      const { id } = action.payload;
      const { [id]: omit, ...updatedTracksById } = state.tracksById;
      return {
        ...state,
        tracksById: updatedTracksById,
      };
    }
    default: {
      return state;
    }
  }
};

export default TrackReducer;
