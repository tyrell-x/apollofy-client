import React, { useEffect, useState } from "react";

import Dropzone from "../../components/Dropzone";

import "./UploadSong.scss";

import { fileTypes } from "../../services/cloudinary";
import * as musicMetadata from "music-metadata-browser";

import Navbar from "../../components/Navbar/index.js";
import SongUploadForm from "../../components/SongUploadForm/index.js";
import { useDispatch, useSelector } from "react-redux";

import { setSongs, uploadSong } from "../../redux/uploader/uploader-actions";
import {
  songsToUploadSelector,
  songPathsToUploadSelector
} from "../../redux/uploader/uploader-selectors.js";
import Button from "../../components/Button/index.js";

function UploadSong() {
  const dispatch = useDispatch();

  const songsToUpload = useSelector(songsToUploadSelector);
  const songPathsToUpload = useSelector(songPathsToUploadSelector);

  useEffect(() => {
  }, [songsToUpload])

  async function handleDropFiles(songsToUpload) {
    const songsData = await Promise.all(
      songsToUpload.map(async (songBlob) => {
        try {
          const trackMetadata = await musicMetadata.parseBlob(songBlob);
          return {
            file: songBlob,
            id: songBlob.name,
            bytes: songBlob.size,
            artist: trackMetadata.common.artist || "",
            title: trackMetadata.common.title || songBlob.name,
            year: trackMetadata.common.year || "",
            genres: trackMetadata.common.genre || [],
          };
        } catch(err) {
          console.warn(`for track ${songBlob.name}`, err);
          return {
            file: songBlob,
            id: songBlob.name,
            bytes: songBlob.size,
            title: songBlob.name
          }
        }
      })
    );
    dispatch(setSongs(songsData.filter(filesData => filesData)));
  }

  const [upload, setUpload] = useState(false);

  const updateAll = () => {
    setUpload(true);
    setTimeout(() => {
      setUpload(false)
    }, 100)
  }

  return (
    <>
      <Navbar title="Upload Song" />
      <div className="upload-song">
        <Dropzone
          filePaths={songPathsToUpload}
          fileType={fileTypes.AUDIO}
          onFilesDropped={(files) => {
            handleDropFiles(files);
          }}
        />
        <Button text="Upload All" onClick={updateAll} />
        {songsToUpload.map((song) => {
          if (!song?.data?.id) {
            console.warn(song, `not found id`);
            return "";
          }
          return <SongUploadForm key={song.data.id} songId={song.data.id} upload={upload} />;
        })}
      </div>
    </>
  );
}

export default UploadSong;
