import "./CreatePlaylist.scss";
import { useState, useEffect } from "react";
import * as AiIcons from "react-icons/ai";
import { selectTrack } from "../../redux/tracks/track-selectors";
import { useDispatch, useSelector } from "react-redux";
import {fetchAllPlaylists} from "../../redux/playlists/playlists-actions"
import {selectAllPlaylistsIds, selectAllPlaylists} from "../../redux/playlists/playlists-selectors"
import { toggleLikeTrack, updateTrack } from "../../redux/tracks/track-actions";
import FLInput from "../FLInput/index.js";
import Button from "../Button/index.js";
import { useForm } from "react-hook-form";
import api from "../../api/playlist-api"
const defaultImage = "https://cdn.onlinewebfonts.com/svg/img_41510.png";

function CreatePlaylist({ id, closePlaylistModal }) {
  const dispatch = useDispatch();
  const playlists = useSelector(selectAllPlaylists)
  useEffect(() => {
    dispatch(fetchAllPlaylists());
  }, []);
  console.log(playlists)
  return (
      <div>
         <div>
            </div> 
      </div>
  )
}

export default CreatePlaylist;