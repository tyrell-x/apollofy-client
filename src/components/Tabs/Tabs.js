import React, { useRef, useState } from "react";
import TabButtons from "../TabButtons";

const Tabs = (props) => {
  const [activeTabLabel, setActiveTabLabel] = useState(
    props.children[0].props.label,
  );
  const content = useRef(props.children[0]);

  const changeTab = (label) => {
    content.current = props.children.find(
      (element) => element.props.label === label,
    );

    setActiveTabLabel(label);
  };

  return (
    <div className="main_container__nav">
      <TabButtons
        activeTabLabel={activeTabLabel}
        labels={props.children.map((child) => child.props.label)}
        changeTab={changeTab}
      />
      <div className="tab-content">{content.current}</div>
    </div>
  );
};

export default Tabs;
