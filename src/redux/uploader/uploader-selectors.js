import { createSelector } from "reselect";

export const selectUploaderState = (state) => state.uploader;

export const uploaderSelector = createSelector(
  [selectUploaderState],
  (uploader) => uploader,
);

export const songToUploadSelector = (songId) =>
  createSelector(
    (state) => state.uploader.songs.find((song) => song.data.id === songId),
    (song) => song,
  );

export const songsToUploadSelector = createSelector(
  (state) => state.uploader.songs,
  (songs) => songs,
);

export const songsToUploadIdsSelector = createSelector(
  (state) => state.uploader.songs,
  (songs) => songs.map((song) => song.data.id),
);

export const songsUploadProgressSelector = createSelector(
  (state) => state.uploader,
  (uploader) => uploader.songsUploadingProgress,
);

export const songPathsToUploadSelector = createSelector(
  (state) => state.uploader.songs.map((song) => song.data.file.path),
  (songs) => songs,
);
