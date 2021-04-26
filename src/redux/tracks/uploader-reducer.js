import * as UploaderTypes from "./uploader-types";

export const UploaderInitialState = {
  songs: [],
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
      const index = state.songs.findIndex(
        (song) => song.data.id === action.payload,
      );
      return {
        ...state,
        songs: [
          ...state.songs.slice(0, index),
          ...state.songs.slice(index + 1),
        ],
      };
    }
    case UploaderTypes.UPDATE_SONG_TO_UPLOAD: {
      return {
        ...state,
        songs: state.songs.map((song) => {
          if (song.data.id === action.payload.songId) {
            return {
              ...song,
              data: {
                ...song.data,
                ...action.payload.dataToUpdate,
              },
            };
          }
          return song;
        }),
      };
    }
    case UploaderTypes.UPLOAD_SONG_REQUEST: {
      return {
        ...state,
        songs: state.songs.map((song) => {
          if (song.data.id === action.payload) {
            return {
              ...song,
              isUploading: true,
              progress: 0,
              failed: false,
              succeeded: false,
            };
          }
          return song;
        }),
      };
    }
    case UploaderTypes.UPLOAD_SONG_PROGRESS: {
      return {
        ...state,
        songs: state.songs.map((song) => {
          if (song.data.id === action.payload.songId) {
            return {
              ...song,
              progress: action.payload.progress,
            };
          }
          return song;
        }),
      };
    }
    case UploaderTypes.UPLOAD_SONG_SUCCESS: {
      return {
        ...state,
        songs: state.songs.map((song) => {
          if (song.data.id === action.payload) {
            return {
              ...song,
              isUploading: false,
              progress: 0,
              succeeded: true,
              failed: false,
            };
          }
          return song;
        }),
      };
    }
    case UploaderTypes.UPLOAD_SONG_ERROR: {
      return {
        ...state,
        songs: state.songs.map((song) => {
          if (song.data.id === action.payload) {
            return {
              ...song,
              isUploading: false,
              progress: 0,
              failed: true,
              succeeded: false,
            };
          }
          return song;
        }),
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
