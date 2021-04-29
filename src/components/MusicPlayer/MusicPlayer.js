import "./MusicPlayer.scss";

import Bar from "./Bar.js";
import { useSelector } from "react-redux";
import Controls from "./Controls.js";
import { playingTrackSelector } from "../../redux/player/player-selectors.js";

export default function Player() {
  const currentTrack = useSelector(playingTrackSelector);

  return (
    <div className="music-player-container">
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
