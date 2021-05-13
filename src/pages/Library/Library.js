import "./Library.scss";

import TabMenu from "../Library/sections/TabMenu";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from "react";
import {playlistDeletePostSuccess} from "../../redux/playlists/playlists-actions.js";



function Library() {
  const dispatch = useDispatch();
  const deletePostSuccess = useSelector(routeState => routeState.playlists.playlistDeletePostSuccess)

    useEffect(()=>{
          dispatch(playlistDeletePostSuccess());
          console.log(deletePostSuccess)
    },[dispatch])

  return (
    <div className="library">
      <div className="library-tabs">
        <TabMenu />
      </div>
    </div>
  );
}

export default Library;
