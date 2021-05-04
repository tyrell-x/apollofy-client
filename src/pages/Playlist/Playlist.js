import "./Playlist.scss";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectPlaylist } from "../../redux/playlists/playlists-selectors.js";
import { getCounter } from "../../utils/utils.js";
import Button from "../../components/Button/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay
} from "@fortawesome/free-solid-svg-icons";

const defaultImage =
  "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440";

function Playlist() {
  const { id } = useParams();

  const playlist = useSelector(selectPlaylist(id));

  return (
    <div className="playlist-page">
      <div className="summary">
        <div className="image">
          <img src={defaultImage} width="280" height="280" alt="playlist"></img>
        </div>
        <div className="details">
          <h5 className="type">PLAYLIST</h5>
          <h4 className="title">{playlist.title}</h4>
          <div className="actions">
            <Button>
            <FontAwesomeIcon icon={faPlay} />
            <span className="play-text">Play</span>
            </Button>
            <button>Boton 1</button>
            <button>Boton 2</button>
            <button>Boton 3</button>
            <button>Boton 4</button>
          </div>
        </div>
      </div>
      <div className="tracks">
        {playlist.tracks.map((track) => (
          <div className="track">
            <div className="image">
              <img src={defaultImage} alt="track" height="100%"></img>
            </div>
            <div className="details">
              <div className="title">{track.title}</div>
              <div className="artist">{track.artist || "anonymous"}</div>
            </div>
            <div className="owner">{track.owned ? "Owned" : ""}</div>
            <div className="duration">{getCounter(120)}</div>
            <div className="actions">
              <div>

              </div>
              <div>
                
              </div>
            </div>
          </div>
        ))}
      </div>
      {JSON.stringify(playlist)}
    </div>
  );
}

export default Playlist;
