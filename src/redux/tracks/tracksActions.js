import {
    GET_TRACKS_DATA_REQUEST, 
    GET_TRACKS_DATA_SUCCESS, 
    GET_TRACKS_DATA_FAILURE,
    SET_TRACKS_LIKED
} from "./tracksTypes"
import api from "../../api-test"

export const getTracksDataRequest = () => {
    return {
        type: GET_TRACKS_DATA_REQUEST
    }
}

export const getTracksDataSuccess = data => {
    return {
        type: GET_TRACKS_DATA_SUCCESS,
        payload: {
            data
        }
    }
}

export const getTracksDataFailure = error => {
    return {
        type: GET_TRACKS_DATA_FAILURE,
        payload: {
            error
        }
    }
}
export const setTracksLiked = liked => {
    return {
        type: SET_TRACKS_LIKED,
        payload: {
            liked
        }
    }
}

export const getTracksData = () => {
    return async (dispatch) => {
      dispatch(getTracksDataRequest())
      try {
        const response = await api.getTracks()
        const tracksData = response.data
        dispatch(getTracksDataSuccess(tracksData))
      } catch(error) {
        const errorMsg = error.message
        dispatch(getTracksDataFailure(errorMsg))
      }
    }
  }

  export const getTracksLiked = () => {
    return async (dispatch) => {
      dispatch(getTracksDataRequest())
      try {
        const response = await api.getTracksLiked()
        const tracksData = response.data
        dispatch(setTracksLiked(tracksData))
      } catch(error) {
        const errorMsg = error.message
        dispatch(getTracksDataFailure(errorMsg))
      }
    }
  }
