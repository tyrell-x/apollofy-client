import "./MusicPlayer.scss";

import { useEffect, useState } from "react";
import { useAudioPlayer, useAudioPosition } from "react-use-audio-player";
import Bar from "./Bar.js";

export default function Player() {
  const { play, pause, stop, volume, load } = useAudioPlayer({
    src:
      "http://res.cloudinary.com/tyrell/video/upload/v1619172223/audio/qB1TyeTpuaN81ZKwL1CaANFPPxQ2/06%20-%20A%20Hard%20Rain%27s%20A-Gonna%20Fall.flac.flac",
    autoplay: false,
    onend: (event) => console.log("song ended!", event),
  });

  return (
    <div className="music-player">
      <div className="controls">
        <button>PLAY</button>
        <button>STOP</button>
        <button>NEXT</button>
      </div>
      <div className="bar-container">
        <Bar />
      </div>
    </div>
  );
}
