import "./UploadSong.scss";

import { useCallback, useEffect } from "react";
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
  const [uploadFormRefs, registerForm, resetRefs] = useRefs();

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

  useEffect(() => resetRefs, [resetRefs, songsToUpload]);

  const uploadAll = useCallback(() => {
    Object.values(uploadFormRefs.current).forEach((form) =>
      typeof form.requestSubmit === "function"
        ? form.requestSubmit()
        : form.dispatchEvent(new Event("submit", { cancelable: true })),
    );
  }, [uploadFormRefs]);

  return (
    <>
      <Navbar title="Upload Song" />
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
          {songsToUpload.map((song) => {
            return (
              <SongUploadForm
                ref={registerForm(song.data.id)}
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
