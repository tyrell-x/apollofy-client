import React, { useEffect, useRef, useState } from "react";
import LibraryItem from "../../../../components/LibraryItem";
import { fetchTracks } from "../../../../redux/tracks/track-actions";
import { useDispatch, useSelector } from "react-redux";
import { selectAllTracks, selectTrackCollection } from "../../../../redux/tracks/track-selectors";
import { trackTypes } from "../../../../redux/tracks/track-types";
import AnimatedList from "../../../../components/AnimatedList/index.js";
import Button from "../../../../components/Button/index.js";
import FLInput from "../../../../components/FLInput/index.js";

function AllTracks() {
  const dispatch = useDispatch();

  const allTracks = useSelector(selectAllTracks);
  const filteredTracksSelected = useSelector(selectTrackCollection(trackTypes.ALL))
  const [filteredTracks, setFilteredTracks] = useState(filteredTracksSelected);

  const toggleLiked = useRef(true);

  useEffect(() => {
    dispatch(fetchTracks());
  }, []);

  useEffect(() => {
    setFilteredTracks(filteredTracksSelected)
  }, [filteredTracksSelected])

  const applyLikedFilter = () => {
    dispatch({
      type: "FILTER_LIKED",
      payload: toggleLiked.current
    })
    toggleLiked.current = !toggleLiked.current
  }

  const applyNameFilter = (e) => {
    setFilteredTracks(allTracks.filter(track => track.title.includes(e.target.value)).map(track => track._id))
  }

  return (
    <div className="library-content">
      <Button onClick={applyLikedFilter}>FILTER LIKED</Button>
      <FLInput onInput={applyNameFilter} label="filter by name" />
      <AnimatedList flipKey={(filteredTracks || []).join("")}>
        {(filteredTracks || []).map((id) => (
          <LibraryItem id={id} key={id} />
        ))}
      </AnimatedList>
    </div>
  );
}

export default AllTracks;
