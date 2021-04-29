import "./Library.scss";

import Navbar from "../../components/Navbar";
import TabMenu from "../Library/sections/TabMenu";
import MusicPlayer from "../../components/MusicPlayer/index.js";

function Library() {
  return (
    <div className="library-background">
      <Navbar title="My Library" />
      <TabMenu />
      <MusicPlayer />
    </div>
  );
}

export default Library;
