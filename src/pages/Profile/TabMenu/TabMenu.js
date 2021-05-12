import React from "react";
import Tab from "../../../components/Tab";
import Tabs from "../../../components/Tabs";
import MyPlaylists from "../sections/MyPlaylists"

function TabMenu({followers, following}) {
  return (
    <Tabs>
      <Tab label="My Playlists">
        <MyPlaylists />
      </Tab>
      <Tab label={followers ? followers.length + " Followers": "Followers"}>
        <div>Followers</div>
      </Tab>
      <Tab label="Following">
        <div>Following</div>
      </Tab>
    </Tabs>
  );
}

export default TabMenu;
