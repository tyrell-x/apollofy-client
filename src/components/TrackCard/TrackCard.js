import "./TrackCard.scss";
import ButtonTrackOptions from "../ButtonTrackOptions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTrack,
} from "../../redux/tracks/track-selectors";
import {
  toggleLikeTrack,
} from "../../redux/tracks/track-actions";
import LikeButton from "../LikeButton";
import AnimatedListItem from "../AnimatedListItem";

const defaultImage = "https://cdn.onlinewebfonts.com/svg/img_41510.png";

function TrackCard({ id }) {
  const dispatch = useDispatch()

  const { name, title, ownedBy, thumbnail = defaultImage, liked } = useSelector(selectTrack(id));

  const onLikeButtonClick = () => {
    dispatch(toggleLikeTrack(id))
  }

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
            <LikeButton liked={liked} onClick={onLikeButtonClick} />
            <ButtonTrackOptions id={id} liked={liked} />
        </div>
      </div>
    </AnimatedListItem>
  );
}

export default TrackCard;
