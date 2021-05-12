import * as ProfileTypes from "./profile-types"

export const initialProfileState = {
    profileLoading: false,
    profileError: null,
    profileInfo: {}
}

const ProfileReducer = (state = initialProfileState, action) => {
    switch (action.type) {
        case ProfileTypes.FETCH_PROFILE_INFO_REQUEST: {
            return {
                ...state,
                profileLoading: true,
            }
        }
        case ProfileTypes.FETCH_PROFILE_INFO_ERROR: {
            const {error} = action.payload
            return {
                ...state,
                profileLoading: false,
                profileError: error
            }
        }
        case ProfileTypes.FETCH_PROFILE_INFO_SUCCESS: {
            const data = action.payload
            return {
                ...state,
                profileLoading: false,
                profileError: null,
                profileInfo: data
            }
        }
        default: {
            return {...state}
        }
    }
}

export default ProfileReducer