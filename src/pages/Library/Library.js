import "./Library.scss";

import Navbar from "../../components/Navbar";
import TabMenu from "../Library/sections/TabMenu";

function Library() {
  return (
    <div className="library-background">
      <Navbar title="My Library" />
      <TabMenu />
    </div>
  );
}

export default Library;
