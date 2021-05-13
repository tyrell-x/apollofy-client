import * as userTypes from "./users-types";

import userApi from "../../api/user-api";
import { normalizeUsers } from "../../schema/user-schema";

export const userUpdateRequest = () => ({
  type: userTypes.UPDATE_USER_REQUEST,
});

export const userUpdateError = (message) => ({
  type: userTypes.UPDATE_USER_ERROR,
  payload: { message },
});

export const userUpdateSuccess = (user) => ({
  type: userTypes.UPDATE_USER_SUCCESS,
  payload: { user },
});

export const fetchUsersRequest = () => ({
  type: userTypes.FETCH_USERS_REQUEST,
});

export const fetchUsersError = (message) => ({
  type: userTypes.FETCH_USERS_ERROR,
  payload: { message },
});

export const fetchUsersSuccess = (users) => ({
  type: userTypes.FETCH_USERS_SUCCESS,
  payload: { users },
});

export const fetchUserRequest = () => ({
  type: userTypes.FETCH_USER_REQUEST,
});

export const fetchUserError = (message) => ({
  type: userTypes.FETCH_USER_ERROR,
  payload: { message },
});

export const fetchUserSuccess = (id, user) => ({
  type: userTypes.FETCH_USER_SUCCESS,
  payload: { id, user },
});


export const updateUserFollowing = (id, followed) => ({
  type: userTypes.UPDATE_USER_FOLLOWING,
  payload: { id, followed },
});

export function fetchAllUsers() {
  return async function fetchUsersThunk(dispatch) {
    dispatch(fetchUserRequest());

    try {
      const res = await userApi.getAllUsers();

      if (res.errorMessage) {
        return dispatch(fetchUsersError(res.errorMessage));
      }

      const normalizedData = normalizeUsers(res.data);

      const users = Object.fromEntries(
        Object.entries(normalizedData.entities.users).map(
          ([key, value]) => [
            key,
            {
              ...value,
            },
          ],
        ),
      );
      return dispatch(fetchUsersSuccess(users));
    } catch (err) {
      return dispatch(fetchUserError(err));
    }
  };
}


export function followUser(id, follow) {
  return async function followUserThunk(dispatch) {
    await userApi.followUser(id, follow);
    dispatch(updateUserFollowing(id, follow));
  };
}

export function updateUser(user) {
  return async function updateUserThunk(dispatch) {
    dispatch(userUpdateRequest());
    dispatch(userUpdateSuccess(user));
    try {
      const res = await userApi.updateUser(user);
    } catch (err) {
      dispatch(userUpdateError(err));
    }
  };
}

