import * as AuthTypes from "./auth-types";

export const AuthInitialState = {
  isSigningUp: false,
  signUpError: null,
  isSigningOut: false,
  signOutError: null,
  isAuthenticated: false,
  isSendingPasswordReset: false,
  passwordResetError: null,
  passwordResetSent: false,

  userIsUpdating: false,
  userIsUpdated: false,
  userUpdateError: null,

  passwordIsChanging: false,
  passwordIsChanged: false,
  passwordChangeError: null,
  currentUser: "",
};

const AuthReducer = (state = AuthInitialState, action) => {
  switch (action.type) {
    case AuthTypes.SIGN_UP_REQUEST: {
      return {
        ...state,
        isSigningUp: true,
        signUpError: null,
      };
    }

    case AuthTypes.SIGN_UP_ERROR: {
      return {
        ...state,
        isSigningUp: false,
        signUpError: action.payload,
        currentUser: "",
      };
    }

    case AuthTypes.SIGN_UP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        isSigningUp: false,
        signUpError: null,
      };
    }

    case AuthTypes.SIGN_OUT_REQUEST: {
      return {
        ...state,
        isSigningOut: true,
        signOutError: null,
      };
    }

    case AuthTypes.SIGN_OUT_ERROR: {
      return {
        ...state,
        isSigningOut: false,
        signOutError: action.payload,
      };
    }

    case AuthTypes.SIGN_OUT_SUCCESS: {
      return {
        ...state,
        isSigningOut: false,
        signOutError: null,
        isAuthenticated: false,
        currentUser: "",
      };
    }

    case AuthTypes.SEND_PASSWORD_RESET_EMAIL_REQUEST: {
      return {
        ...state,
        isSendingPasswordReset: true,
        passwordResetError: null,
        passwordResetSent: false,
      };
    }

    case AuthTypes.SEND_PASSWORD_RESET_EMAIL_ERROR: {
      return {
        ...state,
        isSendingPasswordReset: false,
        passwordResetError: action.payload,
        passwordResetSent: false,
      };
    }

    case AuthTypes.SEND_PASSWORD_RESET_EMAIL_SUCCESS: {
      return {
        ...state,
        isSendingPasswordReset: false,
        passwordResetError: null,
        passwordResetSent: true,
      };
    }

    case AuthTypes.RESET_AUTH_STATE: {
      return {
        ...state,
        isSigningUp: false,
        signUpError: null,
        isSigningOut: false,
        signOutError: null,
        isSendingPasswordReset: false,
        passwordResetError: null,
        passwordResetSent: false,
      };
    }

    case AuthTypes.SET_CURRENT_USER: {
      const { uid } = action.payload;
      return {
        ...state,
        currentUser: uid
      };
    }

    case AuthTypes.UPDATE_USER_ACCOUNT_SUCCESS: {
      return {
        ...state,
        userIsUpdated: true,
        userIsUpdating: false,
        userUpdateError: null,
      };
    }

    case AuthTypes.UPDATE_USER_ACCOUNT_ERROR: {
      return {
        ...state,
        userIsUpdating: false,
        userUpdateError: action.payload,
      };
    }

    case AuthTypes.CHANGE_PASSWORD_REQUEST: {
      return {
        ...state,
        passwordIsChanging: true,
        passwordChangeError: null,
      };
    }

    case AuthTypes.CHANGE_PASSWORD_ERROR: {
      return {
        ...state,
        passwordIsChanging: false,
        passwordChangeError: action.payload,
      };
    }

    case AuthTypes.CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordIsChanged: true,
        passwordIsChanging: false,
        passwordChangeError: null,
      };
    }

    default: {
      return state;
    }
  }
};

export default AuthReducer;
