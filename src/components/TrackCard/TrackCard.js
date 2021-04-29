import "./TrackCard.scss";
import ButtonTrackOptions from "../ButtonTrackOptions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTrack,
} from "../../redux/tracks/track-selectors";
import {
  deleteTrack,
  toggleLikeTrack,
} from "../../redux/tracks/track-actions";
import LikeButton from "../LikeButton";
import AnimatedListItem from "../AnimatedListItem";
import DeleteButton from "../DeleteButton/index.js";
import Button from "../Button/index.js";
import { addTrackToPlayer, removeTrackFromPlayer, removeTrackToPlayer } from "../../redux/player/player-actions.js";
import { isTrackInPlayer } from "../../redux/player/player-selectors.js";

const defaultImage = "https://cdn.onlinewebfonts.com/svg/img_41510.png";

function TrackCard({ id }) {
  const dispatch = useDispatch()

  const { name, title, ownedBy, thumbnail = defaultImage, liked } = useSelector(selectTrack(id)) || {};

  const trackInPlayer = useSelector(isTrackInPlayer(id))

  const onLikeButtonClick = () => {
    dispatch(toggleLikeTrack(id))
  }

  const onDeleteButtonClick = () => {
    dispatch(deleteTrack(id))
  }

  const toggleTrackInPlayer = () => {
    if(trackInPlayer) {
      dispatch(removeTrackFromPlayer(id))
    } else {
      dispatch(addTrackToPlayer(id))
    }
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
            <Button onClick={toggleTrackInPlayer}>{trackInPlayer ? "Remove track" : "Add track"}</Button>
            <DeleteButton onClick={onDeleteButtonClick}></DeleteButton>
            <LikeButton liked={liked} onClick={onLikeButtonClick} />
            <ButtonTrackOptions id={id} liked={liked} />
        </div>
      </div>
    </AnimatedListItem>
  );
}

export default TrackCard;
