import { createSelector } from "reselect";

export const selectAuthState = (state) => state.auth;
export const selectProfileState = (state) => state.auth.currentUser;


export const authSelector = createSelector([selectAuthState], (auth) => auth);

export const profileSelector = createSelector(
  [selectProfileState],
  (currentUser) => currentUser,
);

