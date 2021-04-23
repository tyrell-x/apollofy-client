import * as UploaderTypes from "./uploader-types";

export const UploaderInitialState = {
  songs: {},
  songsUploading: 0,
  songsUploadingProgress: 0,
  isUploadingImage: false,
  uploadImageSuccess: false,
  uploadImageError: false,
  imageUrls: [],
};

const UploaderReducer = (state = UploaderInitialState, action) => {
  switch (action.type) {
    case UploaderTypes.SET_SONGS_TO_UPLOAD: {
      return {
        ...state,
        songs: action.payload,
      };
    }
    case UploaderTypes.UNSET_SONG_TO_UPLOAD: {
      const songsCopy = {...state.songs};
      delete songsCopy[action.payload];
      return {
        ...state,
        songs: songsCopy,
      };
    }
    case UploaderTypes.UPLOAD_SONG_REQUEST: {
      const updatedSongs = {
        ...state.songs,
        [action.payload]: {
          ...state.songs[action.payload],
          isUploading: true,
          progress: 0,
          failed: false,
          succeeded: false,
        },
      };
      return {
        ...state,
        songs: updatedSongs,
        songsUploading: Object.values(updatedSongs).reduce(
          (prev, curr) => prev + (curr.isUploading | 0),
          0,
        ),
      };
    }
    case UploaderTypes.UPLOAD_SONG_PROGRESS: {
      const updatedSongs = {
        ...state.songs,
        [action.payload.songId]: {
          ...state.songs[action.payload.songId],
          progress: action.payload.progress,
        },
      };
      return {
        ...state,
        songs: updatedSongs,
        songsUploadingProgress:
          Object.values(updatedSongs).reduce(
            (acc, curr) => acc + (curr.isUploading && curr.progress),
            0,
          ) / state.songsUploading,
      };
    }
    case UploaderTypes.UPLOAD_SONG_SUCCESS: {
      const updatedSongs = {
        ...state.songs,
        [action.payload]: {
          ...state.songs[action.payload],
          isUploading: false,
          progress: 100,
          succeeded: true,
          failed: false,
        },
      }
      return {
        ...state,
        songs: updatedSongs,
        songsUploading: Object.values(updatedSongs).reduce(
          (prev, curr) => prev + (curr.isUploading | 0),
          0,
        ),
      };
    }
    case UploaderTypes.UPLOAD_SONG_ERROR: {
      const updatedSongs = {
        ...state.songs,
        [action.payload]: {
          ...state.songs[action.payload],
          isUploading: false,
          progress: 0,
          failed: true,
          succeeded: false,
        },
      }
      return {
        ...state,
        songs: updatedSongs,
        songsUploading: Object.values(updatedSongs).reduce(
          (prev, curr) => prev + (curr.isUploading | 0),
          0,
        ),
      };
    }
    case UploaderTypes.UPLOAD_IMAGE_REQUEST: {
      return {
        ...state,
        isUploadingImage: true,
        uploadImageSuccess: false,
        uploadImageError: null,
      };
    }
    case UploaderTypes.UPLOAD_IMAGE_ERROR: {
      return {
        ...state,
        isUploadingImage: false,
        uploadImageSuccess: false,
        uploadImageError: action.payload,
      };
    }
    case UploaderTypes.UPLOAD_IMAGE_SUCCESS: {
      return {
        ...state,
        isUploadingImage: false,
        uploadImageSuccess: true,
        uploadImageError: null,
        imageUrls: [...state.imageUrls, action.payload],
      };
    }

    default: {
      return state;
    }
  }
};

export default UploaderReducer;
