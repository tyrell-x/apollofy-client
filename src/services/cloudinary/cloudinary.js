import axios from "axios";

export const fileTypes = {
  AUDIO: "audio",
  IMAGE: "image",
};

export const getFileUrl = ({ file, fileType, onUploadProgress }) => {
  const songUploadPreset = process.env.REACT_APP_CLOUDINARY_TRACK_UPLOAD_PRESET;
  const imageUploadPreset =
    process.env.REACT_APP_CLOUDINARY_TRACK_UPLOAD_PRESET;
  const unsignedCloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

  const url = `https://api.cloudinary.com/v1_1/${unsignedCloudName}/upload`;

  const fd = new FormData();
  fileType === fileTypes.AUDIO
    ? fd.append("upload_preset", songUploadPreset)
    : fd.append("upload_preset", imageUploadPreset);
  fd.append("file", file);
  fileType === fileTypes.AUDIO
    ? fd.append("resource_type", "video")
    : fd.append("resource_type", "image");
  fd.append("public_id", file.name);
  fd.append("tags", "browser_upload");

  const config = {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: onUploadProgress,
  };

  return axios.post(url, fd, config);
};
