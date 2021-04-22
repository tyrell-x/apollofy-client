import React from "react";
import { string, func } from "prop-types";
import { useDropzone } from "react-dropzone";
import "./Dropzone.scss";
import { fileTypes } from "../../services/cloudinary";

function Dropzone({ fileType, onFileSelected }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: fileType === fileTypes.AUDIO ? "audio/*" : "image/*",
    maxFiles: 1,
    onDropAccepted: onFileSelected,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  return (
    <div>
      <section>
        <div
          {...getRootProps({ className: "dropzone" })}
        >
          <input {...getInputProps()} />
          <p>Drag n drop some files here, or click to select files</p>
        </div>
      </section>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </div>
  );
}

Dropzone.propTypes = {
  fileType: string.isRequired,
  onFileSelected: func,
};

Dropzone.defaultProps = {
  onFileSelected: (_) => {},
};

export default Dropzone;
