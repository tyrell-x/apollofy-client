import React, { useEffect, useState } from "react";

import Dropzone from "../../components/Dropzone";

import "./UploadSong.scss";

import { fileTypes } from "../../services/cloudinary";
import * as musicMetadata from "music-metadata-browser";
import Navbar from "../../components/Navbar/index.js";
import SongUploadForm from "../../components/SongUploadForm/index.js";
import { useDispatch, useSelector } from "react-redux";

import { setSongs} from "../../redux/uploader/uploader-actions"
import { songsToUploadSelector } from "../../redux/uploader/uploader-selectors.js";

function UploadSong() {
  const [filesData, setFilesData] = useState([]);

  const dispatch = useDispatch()

  const songsToUpload = useSelector(songsToUploadSelector);

  useEffect(() => {
    console.log(songsToUpload)
  }, [songsToUpload])

  async function handleDropFiles(uploadFiles) {
    const filesData = await Promise.all(
      uploadFiles.map(async (uploadFile) => {
        const trackMetadata = await musicMetadata.parseBlob(uploadFile);
        return {
          file: uploadFile,
          id: uploadFile.name,
          artist: trackMetadata.common.artist,
          title: trackMetadata.common.title || uploadFile.name || "",
          year: trackMetadata.common.year || "",
          genres: trackMetadata.common.genre || [],
        };
      }),
    );
    dispatch(setSongs(filesData))
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
        {filesData.map((songData) => (
          <SongUploadForm key={songData.id} data={songData} />
        ))}
      </div>
    </>
  );
}

export default UploadSong;
