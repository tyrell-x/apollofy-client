import * as TrackTypes from "./track-types";

export const TrackInitState = {
  tracksLoading: false,
  tracksLoadingError: null,
  tracksFetched: false,
  trackLoading: false,
  trackLoadingError: null,
  trackFetched: false,
  byID: {},
  ids: {},
};

const TrackReducer = (state = TrackInitState, action) => {
  switch (action.type) {
    //TEST
    case "FILTER_LIKED_IN_ALL_COLLECTION": {
      const filterByLiked = action.payload;
      return {
        ...state,
        ids: {
          ...state.ids,
          ALL: filterByLiked
            ? Object.values(state.byID)
                .filter((track) => track.liked)
                .map((track) => track._id)
            : Object.values(state.byID).map((track) => track._id),
        },
      };
    }
    case TrackTypes.FETCH_TRACKS_REQUEST: {
      return {
        ...state,
        tracksLoading: true,
        tracksLoadingError: null,
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
        byID: {
          ...state.byID,
          ...action.payload.byID,
        },
        ids: {
          ...state.ids,
          [fetchType]: [...action.payload.ids],
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
        byID: {
          ...state.byID,
          [trackID]: action.payload,
        },
      };
    }
    case TrackTypes.UPDATE_LIKED_TRACK: {
      const { id, liked } = action.payload;
      return {
        ...state,
        byID: {
          ...state.byID,
          [id]: {
            ...state.byID[id],
            liked: liked,
          },
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default TrackReducer;
