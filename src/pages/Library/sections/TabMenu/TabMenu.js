import React, { useEffect } from "react";
import Tab from "../../../../components/Tab";
import Tabs from "../../../../components/Tabs";
import LikedTracks from "../LikedTracks";
import MyTracks from "../MyTracks";
import MyPlaylists from "../MyPlaylists";
import { useSelector } from "react-redux";
import { selectPlaylistStore } from "../../../../redux/playlists/playlists-selectors.js";
import { selectTracksStore } from "../../../../redux/tracks/track-selectors.js";

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
