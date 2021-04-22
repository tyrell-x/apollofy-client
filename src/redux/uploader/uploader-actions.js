import * as UploaderTypes from "./uploader-types";
import { getFileUrl, fileTypes } from "../../services/cloudinary";
import api from "../../api";
import { getCurrentUserToken } from "../../services/auth";

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

export function uploadSong({ track, fileData }) {
  return async function uploadThunk(dispatch, getState) {
    dispatch(uploadSongRequest());

    try {
      const userToken = await getCurrentUserToken();

      if (!userToken) {
        return dispatch(uploadSongError("User token null!"));
      }

      const cloudResponse = await getFileUrl({
        userId: getState().auth.currentUser._id,
        file: track,
        fileType: fileTypes.AUDIO,
      });

      if (cloudResponse.status >= 400) {
        return dispatch(uploadSongError(cloudResponse.statusText));
      }

      const { url, duration, format, bytes, bit_rate, channel_layout } = cloudResponse.data;
      const { title, year, genres } = fileData;

      console.log({
        title: title,
        year: year,
        genres: genres,
        url: url,
        duration: duration,
        bytes: bytes,
        bitRate: bit_rate,
        isStereo: channel_layout === "stereo",
        format: format
      })

      const response = await api.createTrack({
        body: {
          title: title,
          year: year,
          genreNames: genres,
          url: url,
          duration: duration,
          bytes: bytes,
          bitRate: bit_rate,
          isStereo: channel_layout === "stereo",
          format: format
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.errorMessage) {
        return dispatch(uploadSongError(response.errorMessage));
      }

      return dispatch(uploadSongSuccess(url));
    } catch (err) {
      return dispatch(uploadSongError(err.message));
    }
  };
}

export function uploadImage({
  file,
  name = "",
  genre = "",
  onUploadProgress = (_) => {},
}) {
  return async function uploadImageThunk(dispatch) {
    dispatch(uploadImageRequest());

    try {
      const urlRes = await getFileUrl({
        file: file,
        fileType: fileTypes.IMAGE,
        onUploadProgress: onUploadProgress,
      });

      const imageUrl = urlRes.data.url;

      const imgRes = api.createTrack({
        title: name,
        url: imageUrl,
      });

      if (imgRes.errorMessage) {
        return dispatch(uploadImageError(imgRes.errorMessage));
      }

      return dispatch(uploadImageSuccess(imgRes.data));
    } catch (err) {
      return dispatch(uploadImageError(err));
    }
  };
}
