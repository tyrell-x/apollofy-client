import { useDropzone } from "react-dropzone";
import "./Dropzone.scss";
import { fileTypes } from "../../services/cloudinary";

function Dropzone({ filePaths, fileType, onFilesDropped }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: fileType === fileTypes.AUDIO ? "audio/*" : "image/*",
    maxFiles: 50,
    onDropAccepted: onFilesDropped,
  });


  const files = filePaths.map((file) => (
    <li key={file}>{file}</li>
  ));

  return (
    <div className="dropzone-container">
      <section>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <span className={`drop-text ${filePaths.length && "hidden"}`}>
            Drag n drop some files here, or click to select files
          </span>
          {!!files.length && <ul className="drop-files">{files}</ul>}
        </div>
      </section>
    </div>
  );
}

export default Dropzone;
