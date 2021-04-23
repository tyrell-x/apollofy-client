import { createSelector } from "reselect";

export const selectUploaderState = (state) => state.uploader;

export const uploaderSelector = createSelector(
  [selectUploaderState],
  (uploader) => uploader,
);

export const fileUploaderSelector = (fileId) => createSelector(
  (state) => state.uploader[fileId],
  (fileUploader) => fileUploader,
);

export const songsToUploadSelector = createSelector(
  (state) => state.uploader,
  (songs) => songs,
);
