import * as FinderTypes from "./finder-types";
import finderApi from "../../api/finder-api";
import { addTracks } from "../tracks/track-actions.js";
import { addPlaylists } from "../playlists/playlists-actions.js";

const fetchFind = () => ({
  type: FinderTypes.FIND_REQUEST,
});

const findFailure = () => ({
  type: FinderTypes.FIND_FAILURE,
});

const findSuccess = (found) => ({
  type: FinderTypes.FIND_SUCCESS,
  payload: {
    foundItems: found,
  },
});

export const find = (text) => {
  return async function thunk(dispatch) {
    dispatch(fetchFind());

    await new Promise(resolve => setTimeout(resolve, 300))

    const response = await finderApi.find(text);

    if (!response.isSuccessful) {
      return dispatch(findFailure(response.errorMessage));
    }

    dispatch(addTracks(response.data.tracks));
    dispatch(addPlaylists(response.data.playlists));

    dispatch(findSuccess(response.data));
  };
};
