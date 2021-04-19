import React from 'react';

import Tab from "../../../../components/TabComponents/Tab";
import Tabs from "../../../../components/TabComponents/Tabs";
import PersonalInformation from "../PersonalInformation";

function TabMenu() {

        return(
            <Tabs>
                <Tab label="Personal Information">
                    <PersonalInformation/>
                </Tab>
                <Tab label="Change Password">

                </Tab>
            </Tabs>
        );
}

export default TabMenu;