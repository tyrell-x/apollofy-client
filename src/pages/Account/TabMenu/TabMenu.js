import React from "react";

import Tab from "../../../components/Tab";
import Tabs from "../../../components/Tabs";
import EditAccount from "../sections/EditAccount";
import ChangePassword from "../sections/ChangePassword";

function TabMenu() {
  return (
    <Tabs>
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
