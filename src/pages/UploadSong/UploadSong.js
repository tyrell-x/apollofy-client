import React, { useRef, useState } from "react";
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

  const [file, setFile] = useState();
  const [fileData, setFileData] = useState({
    title: "",
    year: ""
  });
  
  const input = useRef([]);

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(
      uploadSong({
        track: file,
        fileData: fileData,
      }),
    );
  }

  function handleInput(e) {
    console.log( [e.target.name])
    setFileData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSetFile(uploadFile) {
    setFile(uploadFile);
    const trackMetadata = await musicMetadata.parseBlob(uploadFile);
    setFileData({
      title: trackMetadata.common.title || uploadFile.name,
      year: trackMetadata.common.year,
      genres: trackMetadata.common.genre,
    });
    var event = new Event("input", { bubbles: true });
    input.current.forEach(input => input.dispatchEvent(event))
  }

  return (
    <div className="upload-song">
      <h1>Upload Song</h1>
      <form onSubmit={handleSubmit}>
        <div className="file-data">
          <FLInput
            ref={el => input.current[0] = el}
            required
            label="Title"
            name="title"
            borderMode="bottom"
            value={fileData.title}
            onChange={handleInput}
          />
          <FLInput
            ref={el => input.current[1] = el}
            label="Year"
            name="year"
            borderMode="bottom"
            value={fileData.year}
            onChange={handleInput}
          />
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
