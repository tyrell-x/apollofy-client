import React from "react";
import Tab from "../../../../components/Tab";
import Tabs from "../../../../components/Tabs";
import LikedTracks from "../LikedTracks";
import AllTracks from "../AllTracks";
import MyPlaylists from "../MyPlaylists";

function TabMenu() {
  return (
    <Tabs>
      <Tab label="Liked Tracks">
        <LikedTracks />
      </Tab>
      <Tab label="My Playlists">
        <MyPlaylists />
      </Tab>
      <Tab label="All Tracks">
          <AllTracks />
      </Tab>
    </Tabs>
  );
}

export default TabMenu;
