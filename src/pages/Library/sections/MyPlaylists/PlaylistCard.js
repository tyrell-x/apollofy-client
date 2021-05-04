import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPlaylist } from "../../../../redux/playlists/playlists-selectors.js";

const defaultImage = "https://cdn.onlinewebfonts.com/svg/img_41510.png";

export default function PlaylistCard({ id }) {
  const dispatch = useDispatch();

  const { title, tracks } = useSelector(selectPlaylist(id)) || {};

  return (
    <div key={id} flipId={id}>
      {title + JSON.stringify(tracks)}
    </div>
  );
}
