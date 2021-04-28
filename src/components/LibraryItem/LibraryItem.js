import "./TrackItem.scss";
import ButtonTrackOptions from "../ButtonTrackOptions";
import { useSelector } from "react-redux";
import {
  selectTrack,
} from "../../redux/tracks/track-selectors";
import LikeOptions from "../LikeOptions";
import AnimatedListItem from "../AnimatedListItem/index.js";
import { useEffect, useRef } from "react";

const defaultImage = "https://cdn.onlinewebfonts.com/svg/img_41510.png";

function LibraryItem({ id }) {
  const { name, title, ownedBy, thumbnail = defaultImage, liked } = useSelector(selectTrack(id));

  return (
    <AnimatedListItem key={id} flipId={id}>
      <div className="track-card" id={id}>
          <img 
            src={thumbnail ? thumbnail : defaultImage}
            alt="track"
            className="track-image"
          />
        <div className="track-content">
          <div className="track-details">
            <p className="track-name">{name}</p>
            <p className="track-artist">{title}</p>
          </div>
          <div>
            <LikeOptions id={id} liked={liked} />
            <ButtonTrackOptions id={id} liked={liked} />
          </div>
        </div>
      </div>
    </AnimatedListItem>
  );
}

export default LibraryItem;
