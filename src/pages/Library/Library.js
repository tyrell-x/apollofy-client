import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import TabMenu from "../Library/sections/TabMenu";

function Library() {
  return (
    <div className="library-background">
      <Navbar />
      <h1>My Library</h1>
      <TabMenu />
      
    </div>
  );
}

export default Library;
