import React, { useEffect, useRef, useState } from "react";
import TrackCard from "../../../../components/TrackCard";
import { fetchTracks } from "../../../../redux/tracks/track-actions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllTracks
} from "../../../../redux/tracks/track-selectors";
import AnimatedList from "../../../../components/AnimatedList";
import Button from "../../../../components/Button";
import FLInput from "../../../../components/FLInput";

function AllTracks() {
  const dispatch = useDispatch();

  const allTracks = useSelector(selectAllTracks);
  const [filteredTracks, setFilteredTracks] = useState(allTracks);

  useEffect(() => {
    setFilteredTracks(allTracks)
  }, [allTracks])

  useEffect(() => {
    dispatch(fetchTracks());
  }, []);

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
        {(filteredTracks || []).map((track) => (
          <TrackCard id={track._id} key={track._id} />
        ))}
      </AnimatedList>
    </div>
  );
}

export default AllTracks;
