import { createSelector } from "reselect";

export const foundItemsSelector = createSelector(
  (state) => state.finder.foundItems,
  (found) => found || {
    playlists: [],
    tracks: [],
    users: []
  }
);

export const finderStateSelector = createSelector(
    (state) => state.finder,
    (finder) => ({
        isFinding: finder.isFinding,
        findingSucceded: finder.findingSucceded,
        findingFailed: finder.findingFailed,
    })
);