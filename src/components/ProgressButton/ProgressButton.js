import "./ProgressButton.scss";

import Button from "../Button";

function ProgressButton(props) {
  const { className, progress = 0, ...attributes } = props;

  return (
    <div className="progress-button">
      <Button {...attributes} className={className}>
        {props.children}
        <div className="progress-bar">
        <div
          className="progress-bar__filler"
          style={{
            width: `${progress}%`
          }}
        ></div>
        </div>
      </Button>
      
    </div>
  );
}

export default ProgressButton;
