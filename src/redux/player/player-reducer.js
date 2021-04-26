import * as PlayersTypes from "./player-types";

export const PlayerInitialState = {
  tracks: [],
  currentTrack: 0
};

const PlayerReducer = (state = PlayerInitialState, action) => {
  switch (action.type) {
    case PlayersTypes.ADD_PLAYER_TRACK: {
      return {
        ...state,
        tracks: [...state.tracks, ...action.payload],
      };
    }

    case PlayersTypes.SET_NEXT_PLAYER_TRACK: {
      return {
        ...state,
        currentTrack: (state.currentTrack + 1) % state.tracks.length
      }
    }

    case PlayersTypes.SET_PREVIOUS_PLAYER_TRACK: {
      return {
        ...state,
        currentTrack: state.currentTrack ? (state.currentTrack - 1) : (state.tracks.length -1)
      }
    }

    case PlayersTypes.REMOVE_PLAYER_TRACK: {
      return {
        ...state,
        tracks: [...state.tracks, ...action.payload],
      };
    }

    default: {
      return state;
    }
  }
};

export default PlayerReducer;
