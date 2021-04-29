import "./LikeButton.scss";

import * as FiIcons from "react-icons/fi";

function LikeButton({ liked, ...attributes }) {
  return (
    <>
      <button {...attributes} className="like-button">
        <FiIcons.FiHeart className={liked ? "liked" : "not-liked"} />
      </button>
    </>
  );
}

export default LikeButton;
