import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import TabMenu from "../Library/sections/TabMenu";
import {fetchTracks} from "../../redux/tracks/track-actions"
import {useDispatch} from "react-redux"

function Library() {
  const dispatch = useDispatch()

  return (
    <div className="library-background">
      <Navbar />
      <h1>My Library</h1>
      <TabMenu />
      
    </div>
  );
}

export default Library;
