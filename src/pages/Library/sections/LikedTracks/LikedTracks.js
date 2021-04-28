import React, { useState, useEffect } from "react";
import "../../../../components/LibraryContent/LibraryContent.scss";
import LibraryItem from "../../../../components/LibraryItem";
import api from "../../../../api/api";
import {fetchTracksLiked} from "../../../../redux/tracks/track-actions"
import {useDispatch, useSelector} from "react-redux"
import {selectTrackIds, selectTrack} from "../../../../redux/tracks/track-selectors"
import {trackTypes} from "../../../../redux/tracks/track-types"

function LikedTracks() {
  const dispatch = useDispatch()
  const likedTracksIds = useSelector(selectTrackIds(trackTypes.LIKED))
  const [likeState, setLikeState] = useState(false)
  
  useEffect(() => {
    dispatch(fetchTracksLiked())

  }, []);



  return (
    <div className="library-content">
      {likedTracksIds &&
        likedTracksIds.map((id) => (
          <LibraryItem
            id={id}
            key={id}
          />
        ))}
    </div>
  );
}

export default LikedTracks;
