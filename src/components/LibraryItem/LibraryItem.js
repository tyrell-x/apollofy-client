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
const defaultImage = "https://cdn.onlinewebfonts.com/svg/img_41510.png"

function LibraryItem({ id, likeState, setLikeState }) {
  const {name, owner:{login}, thumbnail} = useSelector(selectTrack(id))

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
        <LikeOptions id={id} likeState={likeState} setLikeState={setLikeState}/>
        <ButtonTrackOptions 
        id={id}  
        likeState={likeState} 
        setLikeState={setLikeState}
        />
        
        </div>
        
      </div>
    </div>
  );
}

function LikeOptions({id, liked, likeState, setLikeState}) {

  const likeTrack = async (event) => {
    let heartIconFill = event.currentTarget.firstChild.attributes.fill
    let heartIconStroke = event.currentTarget.firstChild.attributes.stroke
    console.log(heartIconFill, heartIconStroke)
    const like = await api.likeTrackToggle("", id)
    console.log(like)
    setLikeState(like)
  }
  const likeStyle = {
    fill:"red", stroke:"red"
  }
  const unlikeStyle = {
    fill:"none", stroke:"white"
  }
  return (
    <>
      <button id={id} onClick={likeTrack} className="track-options">
        <FiIcons.FiHeart style={liked ? likeStyle : unlikeStyle} />

      </button>
    </>
  )
}

export default LibraryItem;
