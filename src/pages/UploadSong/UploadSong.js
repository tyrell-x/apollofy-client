import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Dropzone from "../../components/Dropzone";

import "./UploadSong.scss";

import { uploadSong } from "../../redux/uploader/uploader-actions";
import { uploaderSelector } from "../../redux/uploader/uploader-selectors";
import { fileTypes } from "../../services/cloudinary";
import * as musicMetadata from "music-metadata-browser";
import FLInput from "../../components/FLInput";
import Navbar from "../../components/Navbar/index.js";
import Button from "../../components/Button/Button.js";

function UploadSong() {
  const dispatch = useDispatch();
  const { isUploadingSong, uploadSongSuccess, uploadSongError } = useSelector(
    uploaderSelector,
  );

  const [file, setFile] = useState();
  const [fileData, setFileData] = useState({
    title: "",
    year: "",
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
    setFileData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSetFile(uploadFile) {
    console.log(uploadFile[0])
    setFile(uploadFile[0]);
    const trackMetadata = await musicMetadata.parseBlob(uploadFile[0]);
    console.log(trackMetadata);

    setFileData({
      title: trackMetadata.common.title || uploadFile[0].name || "",
      year: trackMetadata.common.year || "",
      genres: trackMetadata.common.genre || [],
    });
    var event = new Event("input", { bubbles: true });
    input.current.forEach((input) => input.dispatchEvent(event));
  }

  return (
    <>
      <Navbar />
      <div className="upload-song">
        <h1>Upload Song</h1>
          <Dropzone
            fileType={fileTypes.AUDIO}
            onFileSelected={(files) => {
              handleSetFile(files);
            }}
          />
        <form onSubmit={handleSubmit}>
          <div className={`file-data-inputs ${!file ? "hidden" : ""}`}>
            <FLInput
              ref={(el) => (input.current[1] = el)}
              required
              label="Title"
              name="title"
              borderMode="bottom"
              value={fileData.title}
              onChange={handleInput}
            />
            <FLInput
              ref={(el) => (input.current[2] = el)}
              className="year"
              label="Year"
              name="year"
              borderMode="bottom"
              value={fileData.year}
              onChange={handleInput}
            />
            <Button text="upload" type="submit" disabled={isUploadingSong} className={`upload-button`} />
          </div>
          {isUploadingSong && <p className="text-dark">Uploading song...</p>}
          {uploadSongError && <p className="text-dark">Upload error!</p>}
        </form>

      </div>
    </>
  );
}

export default UploadSong;
