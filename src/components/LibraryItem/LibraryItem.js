import React, {useState} from "react";
import "./TrackItem.scss";
import {BsThreeDotsVertical} from "react-icons/bs"
import TrackModal from "../../components/TrackModal"
import * as FiIcons from "react-icons/fi"
import * as BsIcons from "react-icons/bs"
import api from "../../api-test/api-test"
import ButtonTrackOptions from "../ButtonTrackOptions"
import {useDispatch, useSelector} from "react-redux"
import {selectTrackIds, selectTrack} from "../../redux/tracks/track-selectors"
import LikeOptions from "../LikeOptions"
const defaultImage = "https://cdn.onlinewebfonts.com/svg/img_41510.png"

function LibraryItem({ id }) {
  const {name, owner:{login}, thumbnail, liked} = useSelector(selectTrack(id))

  return (
    <div className="track-card" id={id}>
      <div className="img">
        <img src={thumbnail ? thumbnail : defaultImage} alt="track" className="track-image"></img>
      </div>
      <div className="track-content">
        <div className="track-details">
          <p className="track-name">{name}</p>
          <p className="track-artist">{login}</p>
        </div>
        <div>
          <LikeOptions id={id} liked={liked}/>
          <ButtonTrackOptions id={id} />
        </div>
      </div>
    </div>
  );
}

export default LibraryItem;
