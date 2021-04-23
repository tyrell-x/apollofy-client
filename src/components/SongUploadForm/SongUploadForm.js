import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button.js";
import FLInput from "../../components/FLInput";
import { uploadSong } from "../../redux/uploader/uploader-actions";
import { fileUploaderSelector } from "../../redux/uploader/uploader-selectors.js";

const SongUploadForm = ({ data }) => {
  const dispatch = useDispatch();
  const { isUploading = false, progress = 0, failed = false, succeeded = false } = useSelector(fileUploaderSelector(data.key)) || {};

  const [songData, setsongData] = useState(data);

  useEffect(() => {
  }, [failed, isUploading, progress])

  useEffect(() => {
  }, [succeeded])

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(
      uploadSong({
        songData: songData,
      }),
    );
  }

  function handleInput(e) {
    setsongData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <form className="song-upload-form" onSubmit={handleSubmit}>
      <div className={`file-data-inputs ${!songData ? "hidden" : ""}`}>
        <FLInput
          required
          label="Artist"
          name="artist"
          borderMode="bottom"
          value={songData.artist}
          onChange={handleInput}
        />
        <FLInput
          required
          label="Title"
          name="title"
          borderMode="bottom"
          value={songData.title}
          onChange={handleInput}
        />
        <FLInput
          className="year"
          label="Year"
          name="year"
          borderMode="bottom"
          value={songData.year}
          onChange={handleInput}
        />
        <Button
          text="upload"
          type="submit"
          disabled={isUploading}
          className={`upload-button`}
        />
      </div>
    </form>
  );
};

export default SongUploadForm;
