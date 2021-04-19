import {
  GET_USER_DATA_STARTED, GET_USER_DATA_SUCCESS, GET_USER_DATA_FAILURE
} from "./profile-types";
import api from "../../api-test"

export const getUserDataStarted = () => {
  return {
    type: GET_USER_DATA_STARTED
  }
}

export const getUserDataSuccess = data => {
  return {
    type: GET_USER_DATA_SUCCESS,
    payload: {
      data
    }
  }
}

export const getUserDataFailure = error => {
  return {
    type: GET_USER_DATA_FAILURE,
    payload: {
      error
    }
  }
}

export const getUserData = () => {
  return (dispatch) => {
    dispatch(getUserDataStarted)
    api.getProfileInfo()
      .then(response => {
        const userData = response.data
        dispatch(getUserDataSuccess(userData))
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(getUserDataFailure(errorMsg))
      })
  }
}