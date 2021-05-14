import { createSelector } from "reselect";

export const selectAuthState = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.currentUser;

export const authSelector = createSelector([selectAuthState], (auth) => auth);

export const currentUserSelector = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser,
);
