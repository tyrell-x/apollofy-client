/* eslint-disable no-console */
/* eslint-disable spaced-comment */
import * as UserType from "./users-types";

export const userInitState = {
  userUpdate: false,
  userUpdateError: null,
  usersLoading: false,
  usersLoadingError: null,
  usersFetched: false,
  userLoading: false,
  userLoadingError: null,
  userFetched: false,
  usersById: {},
};

const userReducer = (state = userInitState, action) => {
  switch (action.type) {
    case UserType.UPDATE_USER_REQUEST: {
      return {
        ...state,
        userUpdate: true,
        userUpdateError: null,
      };
    }
    case UserType.UPDATE_USER_ERROR: {
      return {
        ...state,
        userUpdate: false,
        userUpdateError: action.payload,
      };
    }
    case UserType.UPDATE_USER_SUCCESS: {
      const { user } = action.payload;
      return {
        ...state,
        userUpdate: false,
        userUpdateError: null,
        usersById: {
          ...state.usersById,
          [user._id]: user,
        },
      };
    }
    case UserType.FETCH_USERS_REQUEST: {
      return {
        ...state,
        usersLoading: true,
        usersLoadingError: null,
      };
    }
    case UserType.FETCH_USERS_ERROR: {
      return {
        ...state,
        usersLoading: false,
        usersLoadingError: action.payload,
      };
    }
    case UserType.FETCH_USERS_SUCCESS: {
      return {
        ...state,
        usersLoading: false,
        usersLoadingError: null,
        usersFetched: true,
        usersById: {
          ...state.usersById,
          ...action.payload.users,
        },
      };
    }
    case UserType.FETCH_USER_REQUEST: {
      return {
        ...state,
        userLoading: true,
        userLoadingError: null,
      };
    }
    case UserType.FETCH_USER_ERROR: {
      return {
        ...state,
        userLoading: false,
        userLoadingError: action.payload,
      };
    }
    case UserType.FETCH_USER_SUCCESS: {
      const { id, user } = action.payload.user;

      return {
        ...state,
        userLoading: false,
        userLoadingError: null,
        userFetched: true,
        usersById: {
          ...state.usersById,
          [id]: {
            ...user,
          },
        },
      };
    }
    case UserType.UPDATE_USER_FOLLOWING: {
      const { id, followed } = action.payload;
      return {
        ...state,
        usersById: {
          ...state.usersById,
          [id]: {
            ...state.usersById[id],
            followed: followed,
          },
        },
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default userReducer;
