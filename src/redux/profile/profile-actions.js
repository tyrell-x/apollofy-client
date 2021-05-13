import * as ProfileTypes from "./profile-types"
import profileApi from "../../api/profile-api"

export const profileInfoRequest = () => ({
    type: ProfileTypes.FETCH_PROFILE_INFO_REQUEST,
})

export const profileInfoSuccess = (profile) => ({
    type: ProfileTypes.FETCH_PROFILE_INFO_SUCCESS,
    payload: profile,
})

export const profileInfoError = (error) => ({
    type: ProfileTypes.FETCH_PROFILE_INFO_ERROR,
    payload: error,
})

export function fetchProfileInfo () {
    return async function fetchProfileInfoThunk(dispatch) {
        dispatch(profileInfoRequest());
        try {
            const res = await profileApi.getProfileInfo()
            console.log(res)
            if (res.error) {
                return dispatch(profileInfoError(res.error))
            }
            return dispatch(profileInfoSuccess(res.data))
        } catch(error) {
            return dispatch(profileInfoError(error))
        }
        
    }
}