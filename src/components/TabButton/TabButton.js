import "./TabButton.scss";

const TabButton = ({ label, changeTab, activeTabLabel }) => {
  return (
    <div className="tab-button">
      <button
        className={label === activeTabLabel ? "active" : ""}
        onClick={() => changeTab(label)}
      >
        {label}
      </button>
    </div>
  );
};

export default TabButton;
