import "./TrackCard.scss";
import ButtonTrackOptions from "../ButtonTrackOptions";
import { useSelector } from "react-redux";
import {
  selectTrack,
} from "../../redux/tracks/track-selectors";
import LikeTrackButton from "../LikeTrackButton";
import AnimatedListItem from "../AnimatedListItem/index.js";

const defaultImage = "https://cdn.onlinewebfonts.com/svg/img_41510.png";

function TrackCard({ id }) {
  const { name, title, ownedBy, thumbnail = defaultImage, liked } = useSelector(selectTrack(id));

  return (
    <AnimatedListItem key={id} flipId={id}>
      <div className="track-card" id={id}>
          <div className="track-image">
            <img 
              src={thumbnail ? thumbnail : defaultImage}
              alt="track"
            />
          </div>
        <div className="track-content">
          <div className="track-details">
            <p className="track-name">{name}</p>
            <p className="track-artist">{title}</p>
          </div>
        </div>
        <div className="action-buttons">
            <LikeTrackButton id={id} liked={liked} />
            <ButtonTrackOptions id={id} liked={liked} />
        </div>
      </div>
    </AnimatedListItem>
  );
}

export default TrackCard;
