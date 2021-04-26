import React from "react";
import "../LibraryItem/TrackItem.scss";
import * as FiIcons from "react-icons/fi";
import api from "../../api-test/api-test";

function LikeOptions({id, liked, likeState, setLikeState}) {

    const likeTrack = async (event) => {
      const like = await api.likeTrackToggle("", id)
      console.log(like)
      setLikeState(like)
    }
    const likeStyle = {
      fill:"red", stroke:"red"
    }
    const unlikeStyle = {
      fill:"none", stroke:"white"
    }
    return (
      <>
        <button id={id} onClick={likeTrack} className="track-options">
          <FiIcons.FiHeart style={liked ? likeStyle : unlikeStyle} />
        </button>
      </>
    )
  }

export default LikeOptions