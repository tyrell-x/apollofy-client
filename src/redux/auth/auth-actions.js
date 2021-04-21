import * as AuthTypes from "./auth-types";
import api from "../../api";
import * as auth from "../../services/auth";

export const resetStoreAndLogOut = () => ({
  type: AuthTypes.RESET_STORE_AND_LOG_OUT,
});

export const signUpRequest = () => ({
  type: AuthTypes.SIGN_UP_REQUEST,
});

export const signUpError = (message) => ({
  type: AuthTypes.SIGN_UP_ERROR,
  payload: message,
});

export const setUserInfo = (userInfo) => ({
  type: AuthTypes.SET_CURRENT_USER,
  payload: userInfo,
});

export function signInWithGoogleRequest() {
  return async function signUpThunk(dispatch) {
    dispatch(signUpRequest());
    try {
      const response = await auth.signInWithGoogle();
      const additionalUserInfo = response.additionalUserInfo.profile;
      const isNewUser = response.additionalUserInfo.isNewUser;
      const profile = response.user;
      const userInfo = {
        email: profile.email,
        familyName: additionalUserInfo.family_name,
        firstName: additionalUserInfo.given_name,
        displayName: profile.displayName,
        locale: additionalUserInfo.locale,
        pictureUrl: additionalUserInfo.picture,
        phoneNumber: profile.phoneNumber,
        isNewUser: isNewUser,
      };
      dispatch(setUserInfo(userInfo));
    } catch (error) {
      dispatch(signUpError(error.message));
    }
  };
}

export function signUpWithEmailRequest(email, password, user = {}) {
  return async function signUpThunk(dispatch) {
    dispatch(signUpRequest());
    try {
      await auth.signUpWithEmailAndPassword(email, password);
      dispatch(setUserInfo(user));
    } catch (error) {
      dispatch(signUpError(error.message));
    }
  };
}

export function signInWithEmailRequest(email, password) {
  return async function signUpThunk(dispatch) {
    dispatch(signUpRequest());
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      dispatch(signUpError(error.message));
    }
  };
}

export function syncSignIn() {
  return async function syncSignInThunk(dispatch, getState) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    const response = await api.signUp(getState().auth.currentUser, {
      Authorization: `Bearer ${token}`,
    });

    if (response.errorMessage) {
      return dispatch(signUpError(response.errorMessage));
    }

    dispatch(setUserInfo(response.data.data));

    return dispatch(signUpSuccess());
  };
}

export const signUpSuccess = () => ({
  type: AuthTypes.SIGN_UP_SUCCESS,
});

export const signOutRequest = () => ({
  type: AuthTypes.SIGN_OUT_REQUEST,
});

export function signOut() {
  return async function signOutThunk(dispatch) {
    dispatch(signOutRequest());

    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    const response = await api.signOut({
      Authorization: `Bearer ${token}`,
    });

    if (response.errorMessage) {
      return dispatch(signOutError(response.errorMessage));
    }

    auth.signOut();

    return dispatch(signOutSuccess());
  };
}

export const signOutError = (message) => ({
  type: AuthTypes.SIGN_OUT_ERROR,
  payload: message,
});

export const signOutSuccess = () => ({
  type: AuthTypes.SIGN_OUT_SUCCESS,
});

export function sendPasswordResetEmail(email) {
  return async function sendPasswordResetEmailRequestThunk(dispatch) {
    dispatch(sendPasswordResetEmailRequest());
    try {
      await auth.sendPasswordResetEmail(email);
      return dispatch(sendPasswordResetEmailSuccess());
    } catch (error) {
      dispatch(sendPasswordResetEmailError(error.message));
    }
  };
}

export const sendPasswordResetEmailRequest = () => ({
  type: AuthTypes.SEND_PASSWORD_RESET_EMAIL_REQUEST,
});

export const sendPasswordResetEmailError = () => ({
  type: AuthTypes.SEND_PASSWORD_RESET_EMAIL_ERROR,
});

export const sendPasswordResetEmailSuccess = () => ({
  type: AuthTypes.SEND_PASSWORD_RESET_EMAIL_SUCCESS,
});

export const resetAuthState = () => ({
  type: AuthTypes.RESET_AUTH_STATE,
});

export function updateUserAccount(userData) {
  console.log(userData)
  return async function updateUserAccountThunk(dispatch) {
    dispatch(updateUserAccountRequest(userData));
    try {
      const token = await auth.getCurrentUserToken();
      await api.updateUserInfo(
        {
          Authorization: `Bearer ${token}`,
        },
        userData,
        );
      return dispatch(updateUserAccountSuccess(userData));
    } catch (error) {
      return dispatch(updateUserAccountError());
    }
  };
}

export const updateUserAccountRequest = (userData) => ({
  type: AuthTypes.UPDATE_USER_ACCOUNT_REQUEST,
  payload: userData,
});
export const updateUserAccountSuccess = (userData) => ({
  type: AuthTypes.UPDATE_USER_ACCOUNT_SUCCESS,
  payload: userData,
});
export const updateUserAccountError = (message) => ({
  type: AuthTypes.UPDATE_USER_ACCOUNT_ERROR,
  payload: message,
});

export const changePasswordRequest = () => ({
  type: AuthTypes.CHANGE_PASSWORD_REQUEST,
});

export const changePasswordError = (message) => ({
  type: AuthTypes.CHANGE_PASSWORD_ERROR,
  payload: message,
});

export const changePasswordSuccess = () => ({
  type: AuthTypes.CHANGE_PASSWORD_SUCCESS,
});

export function changePassword(userPassword) {
  return async function changePasswordThunk(dispatch) {
    dispatch(changePasswordRequest());
    try {
      await auth.reauthenticatePassword(userPassword);
      await auth.changePassword(userPassword);

      return dispatch(changePasswordSuccess());
    } catch (error) {
      return dispatch(changePasswordError(error));
    }
  };
}
