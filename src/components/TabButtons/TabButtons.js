import TabButton from "../TabButton";
import "./TabButtons.scss";

const TabButtons = ({ labels, changeTab, activeTabLabel }) => {
  return (
    <div className="tab-buttons">
      {labels.map((label) => {
        return (
          <TabButton
            key={label}
            label={label}
            activeTabLabel={activeTabLabel}
            className={label === activeTabLabel ? "active" : ""}
            changeTab={changeTab}
          />
        );
      })}
    </div>
  );
};

export default TabButtons;
