import "./MusicPlayer.scss";

import Bar from "./Bar.js";
import { useSelector } from "react-redux";
import Controls from "./Controls.js";
import { playingTrackSelector } from "../../redux/player/player-selectors.js";
import { authSelector } from "../../redux/auth/auth-selectors.js";

export default function Player() {
  const currentTrack = useSelector(playingTrackSelector);

  const { isAuthenticated } = useSelector(authSelector);
  if(!isAuthenticated) {
    return <></>
  }
  return (
    <div className={`music-player-container ${!!currentTrack ? "filled" : ""}`}>
      <div className="track-info">
        {currentTrack?.artist} - {currentTrack?.title}
      </div>
      <div className="music-player">
        <Controls />
        <Bar />
      </div>
    </div>
  );
}
