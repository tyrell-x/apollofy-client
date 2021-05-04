import React from "react";
import Tab from "../../../../components/Tab";
import Tabs from "../../../../components/Tabs";
import LikedTracks from "../LikedTracks";
import MyTracks from "../MyTracks";
import MyPlaylists from "../MyPlaylists";

function TabMenu() {
  return (
    <Tabs>
      <Tab label="My Playlists">
        <MyPlaylists />
      </Tab>
      <Tab label="Liked Tracks">
        <LikedTracks />
      </Tab>
      <Tab label="My Tracks">
        <MyTracks />
      </Tab>
    </Tabs>
  );
}

export default TabMenu;
