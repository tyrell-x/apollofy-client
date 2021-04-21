import React from "react";

import Tab from "../../../../components/Tab";
import Tabs from "../../../../components/Tabs";
import EditAccount from "../EditAccount";
import InfoAccount from "../InfoAccount";
import ChangePassword from "../ChangePassword";

function TabMenu() {
  return (
    <Tabs>
      <Tab label="Account Details">
        <InfoAccount />
      </Tab>
      <Tab label="Edit Account Details">
        <EditAccount />
      </Tab>
      <Tab label="Change Password">
        <ChangePassword />
      </Tab>
    </Tabs>
  );
}

export default TabMenu;
