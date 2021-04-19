import axios from "axios";

export const fileTypes = {
    AUDIO_FILE: "audio",
    IMAGE_FILE: "image"
}

export const uploadFile = ({file, fileType = fileTypes.AUDIO_FILE, title = ""}) => {
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUDNAME;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset",
    fileType === fileTypes.AUDIO_FILE ?
    process.env.REACT_APP_CLOUDINARY_SONG_UPLOAD_PRESET
    : process.env.REACT_APP_CLOUDINARY_IMAGE_UPLOAD_PRESET)
    formData.append("public_id", title)
    formData.append("resource_type", "video")
    formData.append("tags", ["uploaded_song"])


    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const config = {
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "multipart/form-data",
        }
    }

    return axios.post(url, formData, config)
}