import React from "react";
import "../LibraryItem/TrackItem.scss";
import * as FiIcons from "react-icons/fi";
import api from "../../api-test/api-test";
import {useDispatch, useSelector} from "react-redux"
import {selectTrackIds, selectTrack} from "../../redux/tracks/track-selectors"
import {toggleLikedTrack} from "../../redux/tracks/track-actions"

function LikeOptions({id, liked}) {
  const dispatch = useDispatch()
    const likeTrack = async () => {
      dispatch(toggleLikedTrack(id))
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