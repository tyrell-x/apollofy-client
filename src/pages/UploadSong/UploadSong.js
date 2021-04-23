import React, { useState } from "react";

import Dropzone from "../../components/Dropzone";

import "./UploadSong.scss";

import { fileTypes } from "../../services/cloudinary";
import * as musicMetadata from "music-metadata-browser";
import Navbar from "../../components/Navbar/index.js";
import SongUploadForm from "../../components/SongUploadForm/index.js";

function UploadSong() {
  const [filesData, setFilesData] = useState([]);

  async function handleDropFiles(uploadFiles) {
    const filesData = await Promise.all(
      uploadFiles.map(async (uploadFile) => {
        const trackMetadata = await musicMetadata.parseBlob(uploadFile);
        return {
          file: uploadFile,
          key: trackMetadata.common.title + uploadFile.name,
          artist: trackMetadata.common.artist,
          title: trackMetadata.common.title || uploadFile.name || "",
          year: trackMetadata.common.year || "",
          genres: trackMetadata.common.genre || [],
        };
      }),
    );
    setFilesData(filesData);
  }

  return (
    <>
      <Navbar title="Upload Song" />
      <div className="upload-song">
        <Dropzone
          fileType={fileTypes.AUDIO}
          onFilesDropped={(files) => {
            handleDropFiles(files);
          }}
        />
        {filesData.map((fileData) => (
          <SongUploadForm key={fileData.key} data={fileData} />
        ))}
      </div>
    </>
  );
}

export default UploadSong;
