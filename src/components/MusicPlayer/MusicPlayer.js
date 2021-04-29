import "./MusicPlayer.scss";

import Bar from "./Bar.js";
import { useSelector } from "react-redux";
import {
  currentTrackSelector,
} from "../../redux/player/player-selectors.js";
import Controls from "./Controls.js";

export default function Player() {
  const currentTrack = useSelector(currentTrackSelector);

  /*
  useEffect(() => {
    dispatch(
      addTracksToPlayer([
        {
          url:
            "http://res.cloudinary.com/tyrell/video/upload/v1619138409/audio/qB1TyeTpuaN81ZKwL1CaANFPPxQ2/02%20Robbin%27%20Banks.mp3.mp3",
          name: "Canción 1",
          artist: "Aritsta 1",
        },
        {
          url:
            "http://res.cloudinary.com/tyrell/video/upload/v1619190108/audio/qB1TyeTpuaN81ZKwL1CaANFPPxQ2/07%20-%20Place%20To%20Be.flac.flac",
          name: "Canción 2",
          artist: "Aritsta 2",
        },
        {
          url:
            "http://res.cloudinary.com/tyrell/video/upload/v1619173388/audio/qB1TyeTpuaN81ZKwL1CaANFPPxQ2/08%20-%20Needle%20Of%20Death.flac.flac",
          name: "Canción 3",
          artist: "Aritsta 3",
        },
      ]),
    );
  }, []);
  */

  return (
    <div className="music-player-container">
      <div className="track-info">
        {currentTrack?.data.artist} - {currentTrack?.data.name}
      </div>
      <div className="music-player">
        <Controls />
        <Bar />
      </div>
    </div>
  );
}
