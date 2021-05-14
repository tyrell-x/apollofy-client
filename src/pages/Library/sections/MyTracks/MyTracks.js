import React, { useEffect, useState } from "react";
import TrackCard from "../../../../components/TrackCard";
import { fetchTracks } from "../../../../redux/tracks/track-actions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllTracks,
  selectOwnedTrackIds,
  selectTracksStore,
} from "../../../../redux/tracks/track-selectors";

import AnimatedList from "../../../../components/AnimatedList";
import PuffLoader from "react-spinners/PuffLoader";

function MyTracks() {
  const dispatch = useDispatch();

  const ownedTracks = useSelector(selectOwnedTrackIds);

  useEffect(() => {
    dispatch(fetchTracks());
  }, []);

  const { tracksLoading } = useSelector(selectTracksStore);

  return (
    <div className="library-content">
      <AnimatedList flipKey={(ownedTracks || []).join("")}>
        {(ownedTracks || []).map((id) => (
          <TrackCard id={id} key={id} />
        ))}
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

export default MyTracks;
