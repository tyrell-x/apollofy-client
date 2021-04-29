import "./TabButton.scss";

const TabButton = ({ label, changeTab, activeTabLabel }) => {
  return (
    <div
      className={label === activeTabLabel ? "tab-button active" : "tab-button"}
    >
      <button onClick={() => changeTab(label)}>{label}</button>
    </div>
  );
};

export default TabButton;
