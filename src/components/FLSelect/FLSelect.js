import { useState, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

import "./FLSelect.scss";
import FLInput from "../FLInput/index.js";

export default forwardRef((props, ref) => {
  const {
    name,
    rules,
    error,
    options = [],
    multiple = false,
    allowCreation = false,
    style,
    value,
    ...attributes
  } = props;

  const [expanded, setExpanded] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [selectedOptions] = useState([]);

  const handleInputChange = (event) => {
    if (allowCreation) {
      setTextValue(event.target.value);
    }
  };

  const handleInputClick = () => {
    setExpanded((expanded) => !expanded);
  };

  const handleClickOption = (option) => {
    setTextValue(option.label);
  };

  const handleBlur = () => {
    setExpanded(false);
  };

  return (
    <div className="select-container" onBlur={handleBlur} style={style}>
      <FLInput
        name={name}
        value={textValue}
        onInput={handleInputChange}
        onFocus={() => {}}
        className="select-input"
        containerAttributes={{
          onClick: handleInputClick,
        }}
        {...attributes}
      >
        {" "}
        <div className="chevron-container">
          <FontAwesomeIcon
            className="chevron"
            icon={expanded ? faChevronUp : faChevronDown}
          />
        </div>
      </FLInput>
      <div
        className={`select-options ${expanded ? "expanded" : ""}`}
        style={{
          maxHeight: expanded * options.length * 40,
        }}
      >
        {!options.map((option) => option.label).includes(textValue) ? (
          <div className="option" onClick={handleClickOption}>
            {textValue}
          </div>
        ) : (
          ""
        )}
        {options.map((option) => (
          <div
            className="option"
            key={option.label}
            onMouseDown={() => handleClickOption(option)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
});
