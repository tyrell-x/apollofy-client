import * as TrackTypes from "./track-types";
import { trackTypes } from "./track-types";
import api from "../../api";
import { normalizeTracks } from "../../schema/track-schema";
import * as auth from "../../services/auth";
import { signOutSuccess } from "../auth/auth-actions";

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
    try {
      const token = await auth.getCurrentUserToken();

      if (!token) {
        return dispatch(signOutSuccess());
      }
      const response = await api.getTracks({
        Authorization: `Bearer ${token}`,
      });
      const mapped = response.data.data.slice(0, 30);
      if (response.data) {
        const normalizedTracks = normalizeTracks(mapped);
        dispatch(
          fetchTracksSuccess({
            tracksById: normalizedTracks.entities.tracks,
            trackCollections: normalizedTracks.result,
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

export const fetchLikedTracks = () => {
  return async (dispatch) => {
    dispatch(fetchTracksRequest());
    try {
      const token = await auth.getCurrentUserToken();
      if (!token) {
        return dispatch(signOutSuccess());
      }
      const response = await api.getLikedTracks({
        Authorization: `Bearer ${token}`,
      });
      const mapped = response.data.data
        .slice(0, 30)
        .map((track) => ({ ...track, liked: true }));
      if (response.data) {
        const normalizedTracks = normalizeTracks(mapped);
        dispatch(
          fetchTracksSuccess({
            fetchType: trackTypes.LIKED,
            tracksById: normalizedTracks.entities.tracks,
            trackCollections: normalizedTracks.result,
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

export const fetchOwnedTracks = () => {
  return async (dispatch) => {
    dispatch(fetchTracksRequest());
    try {
      const response = await api.getTracksOwned();
      if (response.data) {
        const normalizedTracks = normalizeTracks(response.data);
        dispatch(
          fetchTracksSuccess({
            fetchType: trackTypes.OWNED,
            tracksById: normalizedTracks.entities.tracks,
            trackCollections: normalizedTracks.result,
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

export const toggleLikeTrack = (id) => {
  return async (dispatch) => {
    try {
      const token = await auth.getCurrentUserToken();

      if (!token) {
        return dispatch(signOutSuccess());
      }
      const response = await api.likeTrackToggle(
        {
          Authorization: `Bearer ${token}`,
        },
        id,
      );

      dispatch(updateLikeTrack(id, response.data.data.liked));
    } catch (error) {}
  };
};

export const updateTrack = (id, data) => {
  return async (dispatch) => {
    try {
      const token = await auth.getCurrentUserToken();

      if (!token) {
        return dispatch(signOutSuccess());
      }
      const response = await api.editTrack(id, data, {
        Authorization: `Bearer ${token}`,
      });

      dispatch(editTrack(id, response.data.data));
    } catch (error) {}
  };
};

export const deleteTrack = (id) => {
  return async (dispatch) => {
    try {
      const token = await auth.getCurrentUserToken();

      if (!token) {
        return dispatch(signOutSuccess());
      }

      const response = await api.deleteTrack(id, {
        Authorization: `Bearer ${token}`,
      });

      dispatch(removeTrack(id));
    } catch (error) {}
  };
};
