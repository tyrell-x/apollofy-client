import * as UploaderTypes from "./uploader-types";
import { getFileUrl, fileTypes } from "../../services/cloudinary";
import api from "../../api";
import { getCurrentUserToken } from "../../services/auth";

export const setSongsToUpload = (songs) => ({
  type: UploaderTypes.SET_SONGS_TO_UPLOAD,
  payload: songs,
});

export const unsetSongToUpload = (songId) => ({
  type: UploaderTypes.UNSET_SONG_TO_UPLOAD,
  payload: songId,
});

export const updateSongToUpload = (songId, dataToUpdate) => ({
  type: UploaderTypes.UPDATE_SONG_TO_UPLOAD,
  payload: {
    songId,
    dataToUpdate
  },
});


export const uploadSongRequest = (songId) => ({
  type: UploaderTypes.UPLOAD_SONG_REQUEST,
  payload: songId,
});

export const uploadSongProgress = (songId, progress) => ({
  type: UploaderTypes.UPLOAD_SONG_PROGRESS,
  payload: {
    songId,
    progress,
  },
});

export const uploadSongSuccess = (songId) => ({
  type: UploaderTypes.UPLOAD_SONG_SUCCESS,
  payload: songId
});

export const uploadSongError = (songId) => ({
  type: UploaderTypes.UPLOAD_SONG_ERROR,
  payload: songId
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

export function updateSongData(songId, data) {

}

export function setSongs(songs) {
  return async function setSongs(dispatch) {
    const songObj = songs.reduce((prev, curr) => {
      return {
        ...prev,
        [curr.id]: {
          data: curr,
          isUploading: false,
          progress: 0,
          failed: false,
          succeeded: false,
        }
      }
    }, {})
    dispatch(setSongsToUpload(songObj))
  };
}

export function uploadSong({ songData }) {
  return async function uploadThunk(dispatch, getState) {
    dispatch(uploadSongRequest(songData.id));

    try {
      const userToken = await getCurrentUserToken();

      if (!userToken) {
        return dispatch(uploadSongError(songData.id, "User token null!"));
      }

      const cloudResponse = await getFileUrl({
        userId: getState().auth.currentUser._id,
        file: songData.file,
        fileType: fileTypes.AUDIO,
        onUploadProgress: (progressEvent) => dispatch(uploadSongProgress(songData.id, (progressEvent.loaded/progressEvent.total)*100))
      });


      if (cloudResponse.status >= 400) {
        return dispatch(uploadSongError(songData.id, cloudResponse.statusText));
      }

      const {
        url,
        duration,
        format,
        bytes,
        bit_rate,
        channel_layout,
      } = cloudResponse.data;
      const { title, year, genres } = songData;

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
          format: format,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.errorMessage) {
        return dispatch(uploadSongError(response.errorMessage));
      }

      return dispatch(uploadSongSuccess(songData.id));
    } catch (err) {
      return dispatch(uploadSongError(songData.id, err.message));
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
