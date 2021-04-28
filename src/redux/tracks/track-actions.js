import * as TrackTypes from "./track-types";
import { trackTypes } from "./track-types";
import api from "../../api-test"
import { normalizeTracks, track } from "../../schema/track-schema";

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
    liked: liked
  }
})


export const fetchTracks = () => {
  return async (dispatch) => {
    dispatch(fetchTracksRequest())
    try {
      const response = await api.getTracks()
      if(response.data) {
        const normalizedTracks = normalizeTracks(response.data)
        console.log(normalizedTracks)
        dispatch(fetchTracksSuccess({
          byID: normalizedTracks.entities.tracks,
          ids: normalizedTracks.result
        }))
      } else {
        dispatch(fetchTracksError(response.errorMessage))
      }
    } catch(error) {
      dispatch(fetchTracksError(error.message))
    }
  }
}

export const fetchTracksLiked = () => {
  return async (dispatch) => {
    dispatch(fetchTracksRequest())
    try {
      const response = await api.getTracksLiked()
      console.log(response)
      if(response.data) {
        const normalizedTracks = normalizeTracks(response.data)
        console.log(normalizedTracks)
        dispatch(fetchTracksSuccess({
          fetchType: trackTypes.LIKED,
          byID: normalizedTracks.entities.tracks,
          ids: normalizedTracks.result
        }))
      } else {
        dispatch(fetchTracksError(response.errorMessage))
      }
    } catch(error) {
      dispatch(fetchTracksError(error))
    }
  }
}

export const toggleLikedTrack = (id) => {
  return async (dispatch) => {
    try {
      const response = await api.likeTrackToggle("", id)
      console.log(response)
      dispatch(updateLikedTrack(id, response.data.liked))
    } catch(error) {

    }
  }

}

export const fetchTracksOwned = () => {
  return async (dispatch) => {
    dispatch(fetchTracksRequest())
    try {
      const response = await api.getTracksOwned()
      if(response.isSuccessful) {
        const normalizedTracks = normalizeTracks(response.data)
        console.log(normalizedTracks)
        dispatch(fetchTracksSuccess({
          fetchType: trackTypes.OWNED,
          byID: normalizedTracks.entities.tracks,
          ids: normalizedTracks.result
        }))
      } else {
        dispatch(fetchTracksError(response.errorMessage))
      }
    } catch(error) {
      dispatch(fetchTracksError(error))
    }
  }
}

export const likeTrack = (id) => {
  return async (dispatch) => {
    dispatch(fetchTracksRequest())
    try {
      const response = await api.likeTrackToggle("", id)
      console.log(response.data.liked)
      if(response.data) {
        const normalizedTracks = normalizeTracks(response.data)
        console.log(normalizedTracks)
        dispatch(fetchTracksSuccess({
          fetchType: trackTypes.LIKED,
          byID: normalizedTracks.entities.tracks,
          ids: normalizedTracks.result
        }))
      } else {
        dispatch(fetchTracksError(response.errorMessage))
      }
    } catch(error) {
      dispatch(fetchTracksError(error))
    }
  }
}


