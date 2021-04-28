import React, { useState, useEffect } from "react";
import "../../../../components/LibraryContent/LibraryContent.scss";
import LibraryItem from "../../../../components/LibraryItem";
import api from "../../../../api-test/api-test";
import {fetchTracks} from "../../../../redux/tracks/track-actions"
import {useDispatch, useSelector} from "react-redux"
import {selectTrackIds, selectTrack} from "../../../../redux/tracks/track-selectors"
import {trackTypes} from "../../../../redux/tracks/track-types"

const defaultImage = "https://cdn.onlinewebfonts.com/svg/img_41510.png"


function AllTracks() {  
  const dispatch = useDispatch()
  const allTrackIds = useSelector(selectTrackIds(trackTypes.ALL))

  useEffect(() => {
    dispatch(fetchTracks())
  }, []);

  return (
    <div className="library-content">
      {
        allTrackIds.map((id) => (
          <LibraryItem
            id={id}
            key={id}
          />
        ))}
    </div>
  );
}

export default AllTracks;
