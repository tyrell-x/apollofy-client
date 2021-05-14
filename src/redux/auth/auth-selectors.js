import { createSelector } from "reselect";

export const selectAuthState = (state) => state.auth;
export const selectCurrentUserId = (state) => state.auth.currentUser;

export const authSelector = createSelector([selectAuthState], (auth) => auth);

export const currentUserSelector = createSelector(
  [selectCurrentUserId, (state) => state.users.usersById],
  (id, users) => users[id] || {},
);
