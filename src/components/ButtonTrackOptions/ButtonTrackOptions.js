import React, { useState } from "react";
import * as BsIcons from "react-icons/bs"
import TrackModal from "../TrackModal"


function ButtonTrackOptions({ id, liked}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown-icon-container">
      <button href="#" onClick={() => setOpen(!open)}>
      <BsIcons.BsThreeDotsVertical id={id}/>
      </button>
      {open ? 
      <TrackModal 
      id={id} liked={liked}
      open={open} setOpen={setOpen}
      /> : ""}
    </div>
  );
}

export default ButtonTrackOptions;