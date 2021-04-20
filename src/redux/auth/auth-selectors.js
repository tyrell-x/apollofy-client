import { createSelector } from "reselect";

export const selectAuthState = (state) => state.auth;

export const authSelector = createSelector([selectAuthState], (auth) => auth);

export const profileSelector = createSelector([selectAuthState], (auth) => auth.currentUser);
