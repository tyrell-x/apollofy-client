import React, {useState} from "react";
import "./TrackItem.scss";
import {BsThreeDotsVertical} from "react-icons/bs"
import TrackModal from "../../components/TrackModal"
import * as FiIcons from "react-icons/fi"
import api from "../../api-test/api-test"

function LibraryItem({ name, artist, image, id, liked, likeState, setLikeState }) {
  
  
  
  return (
    <div className="track-card">
      <div className="img">
        <img src={image} alt="track" className="track-image"></img>
      </div>
      <div className="track-content">
        <div className="track-details">
          <p className="track-name">{name}</p>
          <p className="track-artist">{artist}</p>
        </div>
        <ButtonTrackOptions id={id} likeState={likeState} setLikeState={setLikeState}liked={liked}/>
      </div>
    </div>
  );
}

function ButtonTrackOptions({id, liked, likeState, setLikeState}) {

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
