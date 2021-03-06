import { createSelector } from "reselect";

export const selectUsersStore = createSelector(
  [(state) => state.users],
  (usersStore) => usersStore,
);

export const selectUser = (id) =>
  createSelector(
    (state) => state.users.usersById[id],
    (user) => user || {}
  )
