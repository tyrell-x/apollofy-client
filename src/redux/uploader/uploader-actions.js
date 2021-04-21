import * as UploaderTypes from "./uploader-types";
import { getFileUrl, fileTypes } from "../../services/cloudinary";

export const uploadSongRequest = () => ({
  type: UploaderTypes.UPLOAD_SONG_REQUEST,
});

export const uploadSongError = (message) => ({
  type: UploaderTypes.UPLOAD_SONG_ERROR,
  payload: message,
});

export const uploadSongSuccess = (songUrl) => ({
  type: UploaderTypes.UPLOAD_SONG_SUCCESS,
  payload: songUrl,
});

export const uploadImageRequest = () => ({
  type: UploaderTypes.UPLOAD_IMAGE_REQUEST,
});

export const uploadImageError = (message) => ({
  type: UploaderTypes.UPLOAD_IMAGE_ERROR,
  payload: message,
});

export const uploadImageSuccess = (imageUrl) => ({
  type: UploaderTypes.UPLOAD_IMAGE_SUCCESS,
  payload: imageUrl,
});

export function uploadSong({
  file,
  name = "",
  genres = [],
  onUploadProgress = (_) => {},
}) {
  return async function uploadSongThunk(dispatch) {
    dispatch(uploadSongRequest());

    getFileUrl({
      file: file,
      fileType: fileTypes.AUDIO,
      onUploadProgress: onUploadProgress,
    })
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res.data.url);
        dispatch(uploadSongSuccess(res.data.url));
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        dispatch(uploadSongError(err));
      });
  };
}

export function uploadImage({
  file,
  name = "",
  genres = [],
  onUploadProgress = (_) => {},
}) {
  return async function uploadImageThunk(dispatch) {
    dispatch(uploadImageRequest());

    getFileUrl({
      file: file,
      fileType: fileTypes.IMAGE,
      onUploadProgress: onUploadProgress,
    })
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res.data.url);
        dispatch(uploadImageSuccess(res.data.url));
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        dispatch(uploadImageError(err));
      });
  };
}
