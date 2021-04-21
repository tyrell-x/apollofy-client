import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Dropzone from "../../components/Dropzone";

import "./UploadSong.scss";

import { uploadSong } from "../../redux/uploader/uploader-actions";
import { uploaderSelector } from "../../redux/uploader/uploader-selectors";
import { fileTypes } from "../../services/cloudinary";

function UploadSong() {
  const dispatch = useDispatch();
  const { isUploadingSong, uploadSongSuccess, uploadSongError } = useSelector(
    uploaderSelector,
  );

  function handleSongUpload(file) {
    dispatch(
      uploadSong({
        file: file,
        onUploadProgress: (progress) => {},
      }),
    );
  }

  return (
    <div>
      <div>
        <h4>Upload Audio File</h4>
        <Dropzone
          fileType={fileTypes.AUDIO}
          onFileSelected={(files) => {
            handleSongUpload(files[0]);
          }}
        />
        {isUploadingSong && <p>Uploading song...</p>}
        {uploadSongSuccess && <p>Upload successful!</p>}
        {uploadSongError && <p>Upload error!</p>}
      </div>
    </div>
  );
}

export default UploadSong;
