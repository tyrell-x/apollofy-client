import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Dropzone from "../../components/Dropzone";

import "./UploadImage.scss";

import { uploadImage } from "../../redux/uploader/uploader-actions";
import { uploaderSelector } from "../../redux/uploader/uploader-selectors";
import { fileTypes } from "../../services/cloudinary";

function UploadImage() {
  const dispatch = useDispatch();
  const {
    isUploadingImage,
    uploadImageSuccess,
    uploadImageError,
  } = useSelector(uploaderSelector);

  function handleImageUpload(file) {
    dispatch(
      uploadImage({
        file: file,
        onUploadProgress: (progress) => {},
      }),
    );
  }

  return (
    <div className="h-full p-4">
      <div className="h-full w-full flex flex-col justify-center items-center">
        <h4>Upload Image File</h4>
        <Dropzone
          fileType={fileTypes.IMAGE}
          onFileSelected={(files) => {
            handleImageUpload(files[0]);
          }}
        />
        {isUploadingImage && <p>Uploading song...</p>}
        {uploadImageSuccess && <p>Upload successful!</p>}
        {uploadImageError && <p>Upload error!</p>}
      </div>
    </div>
  );
}

export default UploadImage;
