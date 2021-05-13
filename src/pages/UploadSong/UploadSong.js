import "./UploadSong.scss";

import { useCallback, useEffect, useRef, useState } from "react";
import * as musicMetadata from "music-metadata-browser";

import { useDispatch, useSelector } from "react-redux";
import { setSongs as setSongsToUpload } from "../../redux/uploader/uploader-actions";
import { songsToUploadSelector } from "../../redux/uploader/uploader-selectors";

import Dropzone from "../../components/Dropzone";
import Navbar from "../../components/Navbar";
import SongUploadForm from "../../components/SongUploadForm";
import Button from "../../components/Button";
import AnimatedList from "../../components/AnimatedList";

import { fileTypes } from "../../services/cloudinary";
import { useRefs } from "../../hooks/useRefs.js";

function UploadSong() {
  const dispatch = useDispatch();

  const songsToUpload = useSelector(songsToUploadSelector);
  console.log(songsToUpload);

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
        } catch (err) {
          console.warn(`corrupt track ${songBlob.name}`, err);
          return null;
        }
      }),
    );
    dispatch(setSongsToUpload(songsData.filter((valid) => valid)));
  }

  const elRefs = useRef([]);

  useEffect(() => {
    elRefs.current = elRefs.current.slice(0, songsToUpload.length);
  }, [songsToUpload]);

  const uploadAll = () => {
    Object.values(elRefs.current).forEach((form) => {
      form.requestSubmit();
      return;
    });
  };

  return (
    <>
      <div className="upload-song">
        <Dropzone
          filePaths={songsToUpload.map((song) => song.data.file.path)}
          fileType={fileTypes.AUDIO}
          onFilesDropped={(files) => {
            handleDropFiles(files);
          }}
        />
        <Button text="Upload All" onClick={uploadAll} />

        <AnimatedList
          flipKey={songsToUpload.map((song) => song.data.id).join("")}
        >
          {songsToUpload.map((song, i) => {
            return (
              <SongUploadForm
                ref={(el) => (elRefs.current[i] = el)}
                key={song.data.id}
                song={song}
              />
            );
          })}
        </AnimatedList>
      </div>
    </>
  );
}

export default UploadSong;
