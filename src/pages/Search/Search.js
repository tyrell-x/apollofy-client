import "./Search.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PlaylistCard from "../../components/PlaylistCard/index.js";
import TrackCard from "../../components/TrackCard/index.js";
import { find } from "../../redux/finder/finder-actions.js";
import {
  finderStateSelector,
  foundItemsSelector,
} from "../../redux/finder/finder-selectors.js";
import PuffLoader from "react-spinners/PuffLoader";
import { onAuthStateChanged } from "../../services/auth/auth.js";

export default function Search() {
  const dispatch = useDispatch();
  const { text } = useParams();

  const finderState = useSelector(finderStateSelector);
  const foundItems = useSelector(foundItemsSelector);

  useEffect(() => {
    onAuthStateChanged((user) => {
      if (user) {
        dispatch(find(text));
      }
    });
  }, [dispatch, text]);

  useEffect(() => {
    dispatch(find(text));
  }, [dispatch, text]);

  return (
    <div className="search">
      <div className="title">
        <h2>Items found with </h2>
        <h2 className="text">{text}</h2>
      </div>
      <div className="results">
        <PuffLoader
          color={"rgb(224, 130, 21)"}
          loading={finderState.isFinding}
          size={150}
          css={{
            top: 200,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        {!!foundItems.playlists.length && (
          <div className="list">
            <h3>Playlists</h3>
            <div className="items">
              {(foundItems.playlists || []).map((playlist) => (
                <PlaylistCard id={playlist._id} key={playlist._id} />
              ))}
            </div>
          </div>
        )}
        {!!foundItems.tracks.length && (
          <div className="list">
            <h3>Tracks</h3>
            <div className="items tracks">
              {(foundItems.tracks || []).map((track) => (
                <TrackCard id={track._id} key={track._id} />
              ))}
            </div>
          </div>
        )}
        {!!foundItems.users.length && (
          <div className="list">
            <h3>Users</h3>
            <div className="items">
              {(foundItems.users || []).map((user) => (
                <div>{user.firstName}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
