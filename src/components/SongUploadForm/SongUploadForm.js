import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FLInput from "../../components/FLInput";
import {
  unsetSongToUpload,
  updateSongToUpload,
  uploadSong,
} from "../../redux/uploader/uploader-actions";
import { songToUploadSelector } from "../../redux/uploader/uploader-selectors";
import ProgressButton from "../ProgressButton/index";

const SongUploadForm = ({ songId, upload }) => {
  const dispatch = useDispatch();
  const { data = {}, isUploading = false, progress, failed = false, succeeded = false } =
    useSelector(songToUploadSelector(songId));

  const formRef = useRef(null);

  useEffect(() => {
    if (succeeded) {
      dispatch(unsetSongToUpload(songId));
    }
  });

  useEffect(() => {
    if(upload && !isUploading) {
      const form = formRef.current;
      if (form) {
        if (typeof form.requestSubmit === 'function') {
          form.requestSubmit();
        } else {
          form.dispatchEvent(new Event('submit', {cancelable: true}));
        }
      }
    }
  }, [isUploading, upload])

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      uploadSong({
        songData: data,
      }),
    );
  }

  function handleInput(e) {
    dispatch(
      updateSongToUpload(songId, {
        [e.target.name]: e.target.value
      }),
    );
  }

  return (
    <form className="song-upload-form" onSubmit={handleSubmit} ref={formRef} >
      <div className="file-data-inputs">
        <FLInput
          required
          label="Artist"
          name="artist"
          borderMode="bottom"
          value={data?.artist || ""}
          onChange={handleInput}
        />
        <FLInput
          required
          label="Title"
          name="title"
          borderMode="bottom"
          value={data?.title || ""}
          onChange={handleInput}
        />
        <FLInput
          className="year"
          label="Year"
          name="year"
          borderMode="bottom"
          value={data?.year || ""}
          onChange={handleInput}
        />
        <ProgressButton
          text="upload"
          progress={progress}
          type="submit"
          disabled={isUploading}
          className={`upload-button`}
        />
      </div>
    </form>
  );
};

export default SongUploadForm;
