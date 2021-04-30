import React, { useEffect, useState } from "react";
import TrackCard from "../../../../components/TrackCard";
import { fetchTracks } from "../../../../redux/tracks/track-actions";
import { useDispatch, useSelector } from "react-redux";
import { selectAllTracks } from "../../../../redux/tracks/track-selectors";
import AnimatedList from "../../../../components/AnimatedList";
import FLInput from "../../../../components/FLInput";

function AllTracks() {
  const dispatch = useDispatch();

  const allTracks = useSelector(selectAllTracks);
  const [filteredTracks, setFilteredTracks] = useState(allTracks);

  useEffect(() => {
    setFilteredTracks(allTracks);
  }, [allTracks]);

  useEffect(() => {
    dispatch(fetchTracks());
  }, []);

  const applyNameFilter = (e) => {
    setFilteredTracks(
      filt => allTracks.filter((track) => track.title.includes(e.target.value)),
    );
  };

  return (
    <div className="library-content">
      <div className="filter-inputs">
        <FLInput
          borderMode="bottom"
          onInput={applyNameFilter}
          label="Search"
        />
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
