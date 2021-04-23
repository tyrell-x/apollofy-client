import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import api from "../../api-test/api-test";
import LibraryContent from "../../components/LibraryContent";
import LibraryItem from "../../components/LibraryItem";
import TabMenu from "../Library/sections/TabMenu";
import TrackModal from "../../components/TrackModal"

function Library() {
  const [toggleState, setToggleState] = useState(1);
  const [tracks, setTracks] = useState([]);
  const [allTracks, setAllTracks] = useState([]);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    async function getLikedTracks() {
      const songs = await api.getTracksLiked();
      setTracks(songs);
    }
    getLikedTracks();
    async function getAllTracks() {
      const allSongs = await api.getTracks();
      setAllTracks(allSongs);
    }
    getAllTracks();
  }, []);
  return (
    <div className="library-background">
      <Navbar />
      <h1>My Library</h1>
      <TabMenu />
      <TrackModal />
    </div>
  );
}

export default Library;
