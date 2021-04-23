import React from "react";
import "./TrackItem.scss";
import {BsThreeDotsVertical} from "react-icons/bs"
function LibraryItem({ name, artist, image }) {
  return (
    <div className="track-card">
      <div className="img">
        <img src={image} alt="track" className="track-image"></img>
      </div>
      <div className="track-content">
        <div className="track-details">
          <p className="track-name">{name}</p>
          <p className="track-artist">{artist}</p>
        </div>
        <button className="track-options">
          <BsThreeDotsVertical />
        </button>
      </div>
    </div>
  );
}

export default LibraryItem;
