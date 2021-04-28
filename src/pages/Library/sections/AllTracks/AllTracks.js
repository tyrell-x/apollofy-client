import React, { useEffect, useRef, useState } from "react";
import TrackCard from "../../../../components/TrackCard";
import { fetchTracks } from "../../../../redux/tracks/track-actions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllTracks,
  selectTrackCollection,
} from "../../../../redux/tracks/track-selectors";
import { trackTypes } from "../../../../redux/tracks/track-types";
import AnimatedList from "../../../../components/AnimatedList/index.js";
import Button from "../../../../components/Button/index.js";
import FLInput from "../../../../components/FLInput/index.js";

function AllTracks() {
  const dispatch = useDispatch();

  const allTracks = useSelector(selectAllTracks);
  const filteredTracksSelected = useSelector(
    selectTrackCollection(trackTypes.ALL),
  );
  const [filteredTracks, setFilteredTracks] = useState(filteredTracksSelected);

  useEffect(() => {
    dispatch(fetchTracks());
  }, []);

  useEffect(() => {
    setFilteredTracks(filteredTracksSelected);
  }, [filteredTracksSelected]);

  const toggleLiked = useRef(true);
  const applyLikedFilter = () => {
    dispatch({
      type: "FILTER_LIKED_IN_ALL_COLLECTION",
      payload: toggleLiked.current,
    });
    toggleLiked.current = !toggleLiked.current;
  };

  const applyNameFilter = (e) => {
    setFilteredTracks(
      allTracks
        .filter((track) => track.title.includes(e.target.value))
        .map((track) => track._id),
    );
  };

  return (
    <div className="library-content">
      <div className="filter-inputs">
        <Button onClick={applyLikedFilter}>FILTER LIKED</Button>
        <FLInput
          borderMode="bottom"
          onInput={applyNameFilter}
          label="filter by name"
        />
        <h3 style={{ color: "#ff8300cc" }}> // Filtros de prueba</h3>
      </div>
      <AnimatedList flipKey={(filteredTracks || []).join("")}>
        {(filteredTracks || []).map((id) => (
          <TrackCard id={id} key={id} />
        ))}
      </AnimatedList>
    </div>
  );
}

export default AllTracks;
