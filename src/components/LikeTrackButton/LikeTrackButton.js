import "./LikeTrackButton.scss";

import * as FiIcons from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toggleLikeTrack } from "../../redux/tracks/track-actions";

function LikeTrackButton({ id, liked }) {
  const dispatch = useDispatch();

  const onClick = async () => {
    dispatch(toggleLikeTrack(id));
  };

  return (
    <>
      <button id={id} onClick={onClick} className="like-button">
        <FiIcons.FiHeart className={liked ? "liked" : "not-liked"} />
      </button>
    </>
  );
}

export default LikeTrackButton;
