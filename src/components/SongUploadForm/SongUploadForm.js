import { forwardRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  unsetSongToUpload,
  updateSongToUpload,
  uploadSong,
} from "../../redux/uploader/uploader-actions";

import FLInput from "../FLInput";
import Button from "../Button";
import ProgressButton from "../ProgressButton";
import AnimatedListItem from "../AnimatedListItem";

const SongUploadForm = forwardRef((props, ref) => {
  const {
    song: { data = {}, isUploading = false, progress, succeeded = false },
  } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    if (succeeded) {
      setTimeout(() => {
        dispatch(unsetSongToUpload(data.id));
      }, 1000);
    }
  }, [data.id, dispatch, succeeded]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isUploading) {
      return;
    }
    dispatch(
      uploadSong({
        songData: data,
      }),
    );
  }

  function handleInput(e) {
    dispatch(
      updateSongToUpload(data.id, {
        [e.target.name]: e.target.value,
      }),
    );
  }

  function handleRemove() {
    dispatch(unsetSongToUpload(data.id));
  }

  return (
    <AnimatedListItem key={data.id} flipId={data.id}>
      <form className="song-upload-form" onSubmit={handleSubmit} ref={ref}>
        <div className="file-data-inputs">
          <FLInput
            required
            disabled={isUploading || succeeded}
            label="Artist"
            name="artist"
            borderMode="bottom"
            value={data?.artist || ""}
            onChange={handleInput}
          />
          <FLInput
            required
            disabled={isUploading || succeeded}
            label="Title"
            name="title"
            borderMode="bottom"
            value={data?.title || ""}
            onChange={handleInput}
          />
          <FLInput
            disabled={isUploading || succeeded}
            className="year"
            label="Year"
            name="year"
            borderMode="bottom"
            value={data?.year || ""}
            onChange={handleInput}
          />
          <ProgressButton
            text={succeeded ? "uploaded!" : "upload"}
            progress={progress}
            type="submit"
            disabled={isUploading || succeeded}
            className="upload-button"
          />
          <Button
            text={"remove"}
            progress={progress}
            type="button"
            onClick={handleRemove}
            disabled={isUploading || succeeded}
          />
        </div>
      </form>
    </AnimatedListItem>
  );
});

export default SongUploadForm;
