import React from 'react';

import Tab from "../../../../components/TabComponents/Tab";
import Tabs from "../../../../components/TabComponents/Tabs";
import EditForm from "../EditForm";
import PersonalInformation from "../PersonalInformation";


function TabMenu() {

        return(
            <Tabs>
                <Tab label="Personal Information">
                    <PersonalInformation/>
                </Tab>
                <Tab label="Change Password">
                    {/* <EditForm/> */}
                </Tab>
            </Tabs>
        );
}

export default TabMenu;