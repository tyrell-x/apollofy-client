import React, { useState } from "react";
import * as BsIcons from "react-icons/bs"
import TrackModal from "../TrackModal"


function ButtonTrackOptions({ name, artist, image, id, liked, likeState, setLikeState }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown-icon-container">
      <button href="#" onClick={() => setOpen(!open)}>
      <BsIcons.BsThreeDotsVertical id={id}/>
      </button>
      {open ? 
      <TrackModal
      image={image} 
      id={id} 
      likeState={likeState} 
      setLikeState={setLikeState}
      liked={liked}
      setOpen={setOpen}
      name={name}
      artist={artist}
      /> : ""}
    </div>
  );
}

export default ButtonTrackOptions;