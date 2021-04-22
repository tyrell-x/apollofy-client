import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Dropzone from "../../components/Dropzone";

import "./UploadSong.scss";

import { uploadSong } from "../../redux/uploader/uploader-actions";
import { uploaderSelector } from "../../redux/uploader/uploader-selectors";
import { fileTypes } from "../../services/cloudinary";
import * as musicMetadata from "music-metadata-browser";
import FLInput from "../../components/FLInput/index.js";

function UploadSong() {
  const dispatch = useDispatch();
  const { isUploadingSong, uploadSongSuccess, uploadSongError } = useSelector(
    uploaderSelector,
  );

  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [fileData, setFileData] = useState({})

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(
      uploadSong({
        track: file,
        fileData: fileData
      })
    );
  }

  function handleSetTitle(e) {
    setTitle(e.target.value);
  }

  async function handleSetFile(uploadFile) {
    setFile(uploadFile);
    const trackMetadata = await musicMetadata.parseBlob(uploadFile);
    setFileData({
      title: trackMetadata.common.title || uploadFile.name,
      year: trackMetadata.common.year,
      genres: trackMetadata.common.genre
    })
  }

  return (
    <div className="upload-song">
      <h1>Upload Song</h1>
      <form onSubmit={handleSubmit}>
        <div className="title-input">
          <FLInput label="Title" value={fileData.title} onChange={handleSetTitle} />
        </div>
        <Dropzone
          fileType={fileTypes.AUDIO}
          onFileSelected={(files) => {
            handleSetFile(files[0]);
          }}
        />

        <button
          className="btn btn-primary w-full"
          type="submit"
          disabled={isUploadingSong}
        >
          Login
        </button>
      </form>

      {isUploadingSong && <p className="text-dark">Uploading song...</p>}
      {uploadSongSuccess && file && (
        <p className="text-dark">Upload successful!</p>
      )}
      {uploadSongError && <p className="text-dark">Upload error!</p>}
    </div>
  );
}

export default UploadSong;
