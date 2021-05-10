import * as PlayersTypes from "./player-types";

export const PlayerInitialState = {
  tracks: [],
  currentTrackIndex: 0,
  currentlyPlaying: false,
};

const PlayerReducer = (state = PlayerInitialState, action) => {
  switch (action.type) {
    case PlayersTypes.SET_TRACKS_IN_PLAYER: {
      const tracks = [...action.payload];
      return {
        ...state,
        currentlyPlaying: true,
        tracks: tracks,
      };
    }

    case PlayersTypes.ADD_TRACK_TO_PLAYER: {
      const tracks = [...action.payload].filter(
        (track) => !state.tracks.map((track) => track.id).includes(track.id),
      );

      return {
        ...state,
        tracks: [...state.tracks, ...tracks],
      };
    }

    case PlayersTypes.REMOVE_TRACK_FROM_PLAYER: {
      const { id } = action.payload;

      return {
        ...state,
        tracks: state.tracks.filter((track) => track.id !== id),
      };
    }

    case PlayersTypes.SET_NEXT_TRACK_IN_PLAYER: {
      return {
        ...state,
        currentTrackIndex: (state.currentTrackIndex + 1) % state.tracks.length,
      };
    }

    case PlayersTypes.SET_PREVIOUS_TRACK_IN_PLAYER: {
      return {
        ...state,
        currentTrackIndex: state.currentTrackIndex
          ? state.currentTrackIndex - 1
          : state.tracks.length - 1,
      };
    }

    case PlayersTypes.SET_CURRENTLY_PLAYING: {
      return {
        ...state,
        currentlyPlaying: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default PlayerReducer;
