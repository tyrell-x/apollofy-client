import React from 'react';

import Tab from "../../../../components/TabComponents/Tab";
import Tabs from "../../../../components/TabComponents/Tabs";
// import EditForm from "../EditForm";
import PersonalInformation from "../PersonalInformation";

import ChangePassword from "../../../ChangePassword/ChangePassword";


function TabMenu() {

        return(
            <Tabs>
                <Tab label="Personal Information">
                    <PersonalInformation/>
                </Tab>
                <Tab label="Change Password">
                    <ChangePassword/>
                </Tab>
            </Tabs>
        );
}

export default TabMenu;