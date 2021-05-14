import "./Library.scss";

import TabMenu from "../Library/sections/TabMenu";

function Library() {
  return (
    <div className="library">
      <div className="library-tabs">
        <TabMenu />
      </div>
    </div>
  );
}

export default Library;