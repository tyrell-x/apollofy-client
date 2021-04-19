import api from "../../api-test"
import {
  GET_USER_DATA_STARTED, GET_USER_DATA_SUCCESS, GET_USER_DATA_FAILURE
} from "./profile-types";

const initialState = {
  data:null, 
  loading: false,
  error: null
}

export default function profileReducer (state = initialState, action) {
    switch (action.type) {
      case GET_USER_DATA_STARTED:   
        return {
          ...state,
          loading: true
        }
      case GET_USER_DATA_SUCCESS:
        const {data} = action.payload;
        return {
          ...state,
          data,
          loading: false
        }
      case GET_USER_DATA_FAILURE:
        const {error} = action.payload;
        return {
          ...state,
          error,
        }
      default:
        return state;
    }
  };
  
 