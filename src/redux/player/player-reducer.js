import * as PlayersTypes from "./player-types";

export const PlayersInitialState = {
  tracks: [{
    data: {
      id: 2,
      url: "weewrewre.com"
    },
    timesPlayed: 0
  }], 
  playingTrack: {
    
  }
};

const PlayersReducer = (state = PlayersInitialState, action) => {
  switch (action.type) {
    case PlayersTypes.ADD_PLAYER_TRACK: {
      return {
        tracks: [...state.tracks, ...action.payload],
      };
    }

    case PlayersTypes.REMOVE_PLAYER_TRACK: {
      return {
        tracks: [...state.tracks, ...action.payload],
      };
    }

    default: {
      return state;
    }
  }
};

export default PlayersReducer;
