import {
    GET_TRACKS_DATA_REQUEST, 
    GET_TRACKS_DATA_SUCCESS, 
    GET_TRACKS_DATA_FAILURE,
    SET_TRACKS_LIKED
} from "./tracksTypes"

const tracksInitialState = {
    data: [], 
    loading: false,
    error: null,
    likedTracks: []
}

const tracksReducer = (state = tracksInitialState, action) => {
    switch(action.type) {
        case GET_TRACKS_DATA_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_TRACKS_DATA_SUCCESS:
            const{data} = action.payload; 
            return {
                ...state,
                data,
                loading: false
            }
        case GET_TRACKS_DATA_FAILURE:
            const{error} = action.payload; 
            return {
                ...state,
                error,
            }
        case SET_TRACKS_LIKED:
            const {liked} = action.payload;
            return {
                ...state,
                likedTracks: liked
            }
        default:
            return state;

    }
}

export default tracksReducer