import * as PlayerTypes from "./player-types";

const addPlayerTrack = (tracks) => ({
  type: PlayerTypes.ADD_PLAYER_TRACK,
  payload: tracks,
});

export const setCurrentlyPlaying = (currentlyPlaying) => ({
  type: PlayerTypes.SET_CURRENTLY_PLAYING,
  payload: currentlyPlaying
});

export const setNextTrack = () => ({
  type: PlayerTypes.SET_NEXT_PLAYER_TRACK
});

export const setPreviousTrack = () => ({
  type: PlayerTypes.SET_PREVIOUS_PLAYER_TRACK
});

export const removePlayerTrack = () => ({
  type: PlayerTypes.REMOVE_PLAYER_TRACK,
});

export const addTracksToPlayer = (tracksData = []) => {
  return async function addTracks(dispatch, getState) {
    dispatch(
      addPlayerTrack(
        tracksData.map((track) => ({
          data: track,
          timesPlayed: 0,
        })),
      ),
    );
  };
};