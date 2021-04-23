import { string, func } from "prop-types";
import { useDropzone } from "react-dropzone";
import "./Dropzone.scss";
import { fileTypes } from "../../services/cloudinary";

function Dropzone({ fileType, onFileSelected }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: fileType === fileTypes.AUDIO ? "audio/*" : "image/*",
    maxFiles: 10,
    onDropAccepted: onFileSelected
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  return (
    <div className="dropzone-container">
      <section>
        <div
          {...getRootProps({ className: "dropzone" })}
        >
          <input {...getInputProps()} />
          <span className={`drop-text ${acceptedFiles.length && "hidden"}`}>Drag n drop some files here, or click to select files</span>
          {
            !!files.length && <ul className="drop-files">{files}</ul>
          }
        </div>
      </section>
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
