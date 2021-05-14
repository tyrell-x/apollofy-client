import * as TrackTypes from "./track-types";
import { trackTypes } from "./track-types";
import api from "../../api";
import { normalizeTracks } from "../../schema/track-schema";

export const addTracks = (tracks) => {
  return async (dispatch) => {
    const normalizedTracks = normalizeTracks(tracks)

    dispatch({
      type: TrackTypes.ADD_TRACKS,
      payload: {
        tracks: normalizedTracks.entities.tracks,
      },
    });
  };
};

export const fetchTracksRequest = () => ({
  type: TrackTypes.FETCH_TRACKS_REQUEST,
});

export const fetchTracksSuccess = ({
  fetchType = trackTypes.ALL,
  tracksById,
  trackCollections,
}) => ({
  type: TrackTypes.FETCH_TRACKS_SUCCESS,
  payload: {
    tracksById: tracksById,
    trackCollections: trackCollections,
    type: fetchType,
  },
});

export const fetchTracksError = (message) => ({
  type: TrackTypes.FETCH_TRACKS_ERROR,
  payload: message,
});

export const updateLikeTrack = (id, liked) => ({
  type: TrackTypes.UPDATE_LIKE_TRACK,
  payload: {
    id: id,
    liked: liked,
  },
});

export const editTrack = (id, data) => ({
  type: TrackTypes.UPDATE_TRACK,
  payload: {
    id: id,
    track: data,
  },
});

export const removeTrack = (id) => ({
  type: TrackTypes.REMOVE_TRACK,
  payload: {
    id: id,
  },
});

export const fetchTracks = () => {
  return async (dispatch) => {
    dispatch(fetchTracksRequest());

    await new Promise(resolve => setTimeout(resolve, 300))

    const response = await api.getTracks();
    if (!response.isSuccessful) {
      return dispatch(fetchTracksError(response.errorMessage));
    }
    const mapped = response.data.slice(0, 50);
    const normalizedTracks = normalizeTracks(mapped);

    dispatch(
      fetchTracksSuccess({
        tracksById: normalizedTracks.entities.tracks,
        trackCollections: normalizedTracks.result,
      }),
    );
  };
};

export const fetchLikedTracks = () => {
  return async (dispatch) => {
    dispatch(fetchTracksRequest());

    await new Promise(resolve => setTimeout(resolve, 300))

    const response = await api.getLikedTracks();
    if (!response.isSuccessful) {
      return dispatch(fetchTracksError(response.errorMessage));
    }
    const mapped = response.data
      .slice(0, 10);
    const normalizedTracks = normalizeTracks(mapped);

    dispatch(
      fetchTracksSuccess({
        fetchType: trackTypes.LIKED,
        tracksById: normalizedTracks.entities.tracks,
        trackCollections: normalizedTracks.result,
      }),
    );
  };
};

export const fetchOwnedTracks = () => {
  return async (dispatch) => {
    dispatch(fetchTracksRequest());

    const response = await api.getTracksOwned();
    if (!response.isSuccessful) {
      dispatch(fetchTracksError(response.errorMessage));
    }
    const normalizedTracks = normalizeTracks(response.data);

    return dispatch(
      fetchTracksSuccess({
        fetchType: trackTypes.OWNED,
        tracksById: normalizedTracks.entities.tracks,
        trackCollections: normalizedTracks.result,
      }),
    );
  };
};

export const toggleLikeTrack = (id, liked) => {
  return async (dispatch) => {
    try {
      const response = await api.likeTrackToggle(id, liked);

      dispatch(editTrack(id, response.data));
    } catch (error) {}
  };
};

export const updateTrack = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await api.editTrack(id, data);

      dispatch(editTrack(id, response.data));
    } catch (error) {}
  };
};

export const deleteTrack = (id) => {
  return async (dispatch) => {
    try {
      await api.deleteTrack(id);

      dispatch(removeTrack(id));
    } catch (error) {}
  };
};
