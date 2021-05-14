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

export function addUsers(users) {
  return (dispatch) => {
    const normalizedUsers = normalizeUsers(users);
    dispatch(fetchUsersSuccess(normalizedUsers.entities.users));
  };
}

export function fetchAllUsers() {
  return async function fetchUsersThunk(dispatch) {
    dispatch(fetchUsersRequest());

    const res = await userApi.getAllUsers();
    if (res.errorMessage) {
      return dispatch(fetchUsersError(res.errorMessage));
    }
    dispatch(addUsers(res.data));
  };
}

export function followUser(id, follow) {
  return async function followUserThunk(dispatch) {
    const res = await userApi.followUser(id, follow);
    console.log(res);
    dispatch(updateUserFollowing(id, res.data));
  };
}

export function updateUser(user) {
  return async function updateUserThunk(dispatch) {
    dispatch(userUpdateRequest());

    try {
      const res = await userApi.updateUser(user);
      console.log(res);
      dispatch(userUpdateSuccess(res));
    } catch (err) {
      dispatch(userUpdateError(err));
    }
  };
}
