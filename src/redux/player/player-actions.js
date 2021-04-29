import * as PlayerTypes from "./player-types";

const insertTracksToPlayer = (tracks) => ({
  type: PlayerTypes.ADD_TRACK_TO_PLAYER,
  payload: tracks,
});

export const removeTrackFromPlayer = (id) => ({
  type: PlayerTypes.REMOVE_TRACK_FROM_PLAYER,
  payload: {
    id: id
  },
});

export const setCurrentlyPlaying = (currentlyPlaying) => ({
  type: PlayerTypes.SET_CURRENTLY_PLAYING,
  payload: currentlyPlaying
});

export const setNextTrack = () => ({
  type: PlayerTypes.SET_NEXT_TRACK_IN_PLAYER
});

export const setPreviousTrack = () => ({
  type: PlayerTypes.SET_PREVIOUS_TRACK_IN_PLAYER
});

export const addTrackToPlayer = (trackId) => {
  return async function addTracks(dispatch) {
    dispatch(
      insertTracksToPlayer([{
        id: trackId,
        timesPlayed: 0,
      }])
    );
  };
};

export const addTracksToPlayer = (tracksIds = []) => {
  return async function addTracks(dispatch) {
    dispatch(
      insertTracksToPlayer(
        tracksIds.map((id) => ({
          id: id,
          timesPlayed: 0,
        })),
      ),
    );
  };
};