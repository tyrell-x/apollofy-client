import React, { useEffect } from "react";
import LibraryItem from "../../../../components/LibraryItem";
import { fetchTracksLiked } from "../../../../redux/tracks/track-actions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLikedTrackIds,
  selectTracksStore,
} from "../../../../redux/tracks/track-selectors";
import AnimatedList from "../../../../components/AnimatedList/index.js";

function LikedTracks() {
  const dispatch = useDispatch();
  const likedTracksIds = useSelector(selectLikedTrackIds);
  const { tracksLoading } = useSelector(selectTracksStore);

  useEffect(() => {
    dispatch(fetchTracksLiked());
  }, []);

  return (
    <div className="library-content">
      {tracksLoading ? (
        "SPINNER"
      ) : (
        <AnimatedList flipKey={likedTracksIds.join("")}>
          {likedTracksIds &&
            likedTracksIds.map((id) => <LibraryItem id={id} key={id} />)}
        </AnimatedList>
      )}
    </div>
  );
}

export default LikedTracks;
