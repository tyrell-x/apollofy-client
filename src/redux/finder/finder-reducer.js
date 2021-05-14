import * as FinderTypes from "./finder-types";

export const FinderInitialState = {
  isFinding: false,
  findingSucceded: false,
  findingFailed: false,
  foundItems: {
    playlists: [],
    users: [],
    tracks: [],
  },
};

const FinderReducer = (state = FinderInitialState, action) => {
  switch (action.type) {
    case FinderTypes.FIND_REQUEST: {
      return {
        ...state,
        isFinding: true,
				findingSucceded: false,
        findingFailed: false,
        foundItems: {
          playlists: [],
          users: [],
          tracks: [],
        }
      };
    }

    case FinderTypes.FIND_SUCCESS: {
      const { foundItems } = action.payload;

      return {
        ...state,
        isFinding: false,
        findingSucceded: true,
        foundItems: foundItems,
      };
    }

    case FinderTypes.FIND_FAILURE: {
      return {
        ...state,
				isFinding: false,
        findingFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};

export default FinderReducer;
