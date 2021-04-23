import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button.js";
import FLInput from "../../components/FLInput";
import { uploadSong } from "../../redux/uploader/uploader-actions";
import { uploaderSelector } from "../../redux/uploader/uploader-selectors.js";


const SongUploadForm = ({ data }) => {
  const dispatch = useDispatch();
	const { uploadSongSuccess } = useSelector(
    uploaderSelector,
  );

  const [isUploading, setIsUploading] = useState(false);
  const [fileData, setFileData] = useState(data);

	useEffect(() => {
		if(uploadSongSuccess) {
			setIsUploading(false)
		}
	}, [uploadSongSuccess])

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(
      uploadSong({
        fileData: fileData,
      }),
    );
    setIsUploading(true);
  }

  function handleInput(e) {
    setFileData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <form className="song-upload-form" onSubmit={handleSubmit}>
      <div className={`file-data-inputs ${!fileData ? "hidden" : ""}`}>
				<FLInput
          required
          label="Artist"
          name="artist"
          borderMode="bottom"
          value={fileData.artist}
          onChange={handleInput}
        />
        <FLInput
          required
          label="Title"
          name="title"
          borderMode="bottom"
          value={fileData.title}
          onChange={handleInput}
        />
        <FLInput
          className="year"
          label="Year"
          name="year"
          borderMode="bottom"
          value={fileData.year}
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
