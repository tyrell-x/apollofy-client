import { useDispatch, useSelector } from "react-redux";
import "./Home.scss";
import Button from "../../components/Button/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { setTracksInPlayer } from "../../redux/player/player-actions.js";
import { useEffect } from "react";
import { onAuthStateChanged } from "../../services/auth/auth.js";
import { fetchAllPlaylists } from "../../redux/playlists/playlists-actions.js";
import { selectLastPlaylist, selectPlaylistStore } from "../../redux/playlists/playlists-selectors.js";
import { selectRandomTracks, selectTracksStore } from "../../redux/tracks/track-selectors.js";
import { fetchTracks } from "../../redux/tracks/track-actions.js";
import PuffLoader from "react-spinners/PuffLoader";

const defaultImage =
  "https://i.pinimg.com/originals/f8/65/d3/f865d3112022612c6875b4ab7ec54239.jpg";

function Home() {
  const dispatch = useDispatch();

  const lastPlaylist = useSelector(selectLastPlaylist);
  const randomSongs = useSelector(selectRandomTracks(9));

  const { playlistsLoading } = useSelector(selectPlaylistStore);
  const { tracksLoading } = useSelector(selectTracksStore);

  useEffect(() => {
    onAuthStateChanged((user) => {
      if (user) {
        dispatch(fetchAllPlaylists());
        dispatch(fetchTracks());
      }
    });
  }, [dispatch]);

  const playPlaylist = () => {
    dispatch(setTracksInPlayer(lastPlaylist.tracks.map((track) => track._id)));
  };

  const playTrack = (trackId) => {
    dispatch(setTracksInPlayer([trackId]));
  };

  return (
    <div className="home">
      <section className="outstanding-playlist">
        <div className="logo">APOLLOFY</div>
        <div className="details">
          <div className="image-container">
            <img
              src={lastPlaylist.thumbnail || defaultImage}
              alt="playlist"
            ></img>
          </div>
          <div className="info">
            <div className="role">NEWER PLAYLIST</div>
            <div className="title">{lastPlaylist.title}</div>
            <div className="owner">{}</div>
          </div>
        </div>
        <Button className="play-button" onClick={playPlaylist}>
          <FontAwesomeIcon icon={faPlay} />
          <span className="play-text">Play</span>
        </Button>
      </section>
      <section className="popular-songs">
        <div className="title">Top Songs</div>
        <div className="track-list">
          {randomSongs.map((track, index) => (
            <div className="popular-track-card">
              <span className="position">{index}</span>
              <div
                className="image-container"
                onClick={() => playTrack(track._id)}
              >
                <img className="image" src={track.thumbnail} alt="track" />
                <div className="playbutton">
                  <FontAwesomeIcon icon={faPlay} />
                </div>
              </div>
              <div className="details">
                <div className="title">{track.title}</div>
                <div className="artist">{track.artist}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <PuffLoader
        color={"rgb(224, 130, 21)"}
        loading={playlistsLoading || tracksLoading}
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

export default Home;
