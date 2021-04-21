import * as UploaderTypes from "./uploader-types";

export const UploaderInitialState = {
  isUploadingSong: false,
  uploadSongSuccess: false,
  uploadSongError: null,
  songUrls: [],
  isUploadingImage: false,
  uploadImageSuccess: false,
  uploadImageError: null,
  imageUrls: [],
};

const UploaderReducer = (state = UploaderInitialState, action) => {
  switch (action.type) {
    case UploaderTypes.UPLOAD_SONG_REQUEST: {
      return {
        ...state,
        isUploadingSong: true,
        uploadSongSuccess: false,
        uploadSongError: null,
      };
    }
    case UploaderTypes.UPLOAD_SONG_ERROR: {
      return {
        ...state,
        isUploadingSong: false,
        uploadSongSuccess: false,
        uploadSongError: action.payload,
      };
    }
    case UploaderTypes.UPLOAD_SONG_SUCCESS: {
      return {
        ...state,
        isUploadingSong: false,
        uploadSongSuccess: true,
        uploadSongError: null,
        songUrls: [...state.songUrls, action.payload],
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
