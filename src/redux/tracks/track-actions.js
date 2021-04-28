import * as TrackTypes from "./track-types";
import { trackTypes } from "./track-types";
import api from "../../api";
import { normalizeTracks, track } from "../../schema/track-schema";
import * as auth from "../../services/auth";
import { signOutSuccess } from "../auth/auth-actions.js";

export const fetchTracksRequest = () => ({
  type: TrackTypes.FETCH_TRACKS_REQUEST,
});

export const fetchTracksSuccess = ({
  fetchType = trackTypes.ALL,
  byID,
  ids,
}) => ({
  type: TrackTypes.FETCH_TRACKS_SUCCESS,
  payload: {
    byID: byID,
    ids: ids,
    type: fetchType,
  },
});

export const fetchTracksError = (message) => ({
  type: TrackTypes.FETCH_TRACKS_ERROR,
  payload: message,
});

export const updateLikedTrack = (id, liked) => ({
  type: TrackTypes.UPDATE_LIKED_TRACK,
  payload: {
    id: id,
    liked: liked,
  },
});

export const fetchTracks = () => {
  return async (dispatch) => {
    dispatch(fetchTracksRequest());
    try {
      const token = await auth.getCurrentUserToken();

      if (!token) {
        return dispatch(signOutSuccess());
      }
      const response = await api.getTracks({
        Authorization: `Bearer ${token}`,
      });
      const mapped = response.data.data.slice(0, 30)
      if (response.data) {
        const normalizedTracks = normalizeTracks(mapped);
        dispatch(
          fetchTracksSuccess({
            byID: normalizedTracks.entities.tracks,
            ids: normalizedTracks.result,
          }),
        );
      } else {
        dispatch(fetchTracksError(response.errorMessage));
      }
    } catch (error) {
      dispatch(fetchTracksError(error.message));
    }
  };
};

export const fetchTracksLiked = () => {
  return async (dispatch) => {
    dispatch(fetchTracksRequest());
    try {
      const token = await auth.getCurrentUserToken();
      if (!token) {
        return dispatch(signOutSuccess());
      }
      const response = await api.getTracks({
        Authorization: `Bearer ${token}`,
      });
      const mapped = response.data.data.slice(0, 30)
      if (response.data) {
        const normalizedTracks = normalizeTracks(mapped);
        console.log(normalizedTracks);
        dispatch(
          fetchTracksSuccess({
            fetchType: trackTypes.LIKED,
            byID: normalizedTracks.entities.tracks,
            ids: normalizedTracks.result,
          }),
        );
      } else {
        dispatch(fetchTracksError(response.errorMessage));
      }
    } catch (error) {
      dispatch(fetchTracksError(error));
    }
  };
};

export const fetchTracksOwned = () => {
  return async (dispatch) => {
    dispatch(fetchTracksRequest());
    try {
      const response = await api.getTracksOwned();
      if (response.data) {
        const normalizedTracks = normalizeTracks(response.data);
        dispatch(
          fetchTracksSuccess({
            fetchType: trackTypes.OWNED,
            byID: normalizedTracks.entities.tracks,
            ids: normalizedTracks.result,
          }),
        );
      } else {
        dispatch(fetchTracksError(response.errorMessage));
      }
    } catch (error) {
      dispatch(fetchTracksError(error));
    }
  };
};

export const toggleLikedTrack = (id) => {
  return async (dispatch) => {
    try {
      const token = await auth.getCurrentUserToken();

      if (!token) {
        return dispatch(signOutSuccess());
      }
      const response = await api.likeTrackToggle({
        Authorization: `Bearer ${token}`,
      }, id);

      dispatch(updateLikedTrack(id, response.data.data.liked));
    } catch (error) {}
  };
};