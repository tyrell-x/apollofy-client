import React, { useEffect } from "react";
import TrackCard from "../../../../components/TrackCard";
import { fetchLikedTracks } from "../../../../redux/tracks/track-actions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLikedTrackIds,
  selectTracksStore,
} from "../../../../redux/tracks/track-selectors";
import AnimatedList from "../../../../components/AnimatedList";
import PuffLoader from "react-spinners/PuffLoader";

function LikedTracks() {
  const dispatch = useDispatch();
  const likedTracksIds = useSelector(selectLikedTrackIds);

  useEffect(() => {
    dispatch(fetchLikedTracks());
  }, [dispatch]);

  const { tracksLoading } = useSelector(selectTracksStore);

  return (
    <div className="library-content">
      <AnimatedList flipKey={likedTracksIds.join("")}>
        {likedTracksIds &&
          likedTracksIds.map((id) => <TrackCard id={id} key={id} />)}
      </AnimatedList>
      <PuffLoader
        color={"rgb(224, 130, 21)"}
        loading={tracksLoading}
        size={150}
        css={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}

export default LikedTracks;
