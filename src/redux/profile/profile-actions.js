import * as ProfileTypes from "./profile-types"
import profileApi from "../../api/profile-api"
import { addUsers } from "../users/users-actions.js"

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
        const res = await profileApi.getProfileInfo();


        if (res.isSuccessful) {
            return dispatch(profileInfoError(res.error))
        }
        dispatch(addUsers(res.data.followedBy.concat(res.data.following)))

        return dispatch(profileInfoSuccess({
            ...res.data,
            followedBy: res.data.followedBy.map(user => user._id),
            following: res.data.following.map(user => user._id)
        }))
    }
}