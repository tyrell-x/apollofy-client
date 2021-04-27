import React, { useState, useEffect } from "react";
import "../../../../components/LibraryContent/LibraryContent.scss";
import LibraryItem from "../../../../components/LibraryItem";
import api from "../../../../api-test/api-test";
import {getTracksData, getTracksLiked} from "../../../../redux/tracks/tracksActions"
import {useDispatch, useSelector} from "react-redux"
import {tracksSelector, likedTracksSelector} from "../../../../redux/tracks/tracksSelectors"
const defaultImage = "https://cdn.onlinewebfonts.com/svg/img_41510.png"

function LikedTracks() {
  const dispatch = useDispatch()
  const tracksRedux = useSelector(tracksSelector)
  const likedTracksRedux = useSelector(likedTracksSelector)

  const [tracks, setTracks] = useState([]);
  const [likeState, setLikeState] = useState(false)
  useEffect(() => {
    dispatch(getTracksData())
    dispatch(getTracksLiked())
    async function getLikedTracks() {
      const songs = await api.getTracksLiked();
      setTracks(songs);
    }
    getLikedTracks();
  }, []);

  useEffect(() => {
    dispatch(getTracksLiked())
    console.log(likedTracksRedux)
  }, [tracksRedux])

  return (
    <div className="library-content">
      {tracksRedux.data &&
        tracksRedux.data.map((track) => (
          <LibraryItem
            likeState={likeState}
            setLikeState={setLikeState}
            id={track.id}
            key={track.id}
            name={track.name}
            artist={track.owner.login}
            image={track.thumbnail !== null ? track.thumbnail : defaultImage}
            liked={track.liked}
          />
        ))}
    </div>
  );
}

export default LikedTracks;
