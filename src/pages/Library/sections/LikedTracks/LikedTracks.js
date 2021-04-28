import React, { useEffect } from "react";
import TrackCard from "../../../../components/TrackCard";
import { fetchLikedTracks } from "../../../../redux/tracks/track-actions";
import { useDispatch, useSelector } from "react-redux";
import { selectLikedTrackIds } from "../../../../redux/tracks/track-selectors";
import AnimatedList from "../../../../components/AnimatedList/index.js";

function LikedTracks() {
  const dispatch = useDispatch();
  const likedTracksIds = useSelector(selectLikedTrackIds);

  useEffect(() => {
    dispatch(fetchLikedTracks());
  }, []);

  return (
    <div className="library-content">
      <AnimatedList flipKey={likedTracksIds.join("")}>
        {likedTracksIds &&
          likedTracksIds.map((id) => <TrackCard id={id} key={id} />)}
      </AnimatedList>
    </div>
  );
}

export default LikedTracks;
