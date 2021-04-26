import React, {useState, useEffect} from "react"
import * as AiIcons from "react-icons/ai";
import api from "../../api-test/api-test"
import * as FiIcons from "react-icons/fi"
import LikeOptions from "../LikeOptions"

function TrackModal({id, image, name, artist, liked, likeState, setLikeState, setOpen}){
    const [trackInfo, setTrackInfo] = useState([])

    // useEffect(() => {
    //     async function getTrackInfo(id) {
    //         const songInfo = await api.getTrackInfo( "", id);
    //         setTrackInfo(songInfo);
    //         console.log(songInfo)
    //     }
    //     getTrackInfo(id);
    // }, [])
    const likeStyle = {
        fill:"red", stroke:"red"
      }
      const unlikeStyle = {
        fill:"none", stroke:"white"
      }

    return(
        <div className="track-options-modal">
            <div onClick={()=>setOpen(false)}>
                <AiIcons.AiOutlineClose />
            </div>
            <div className="options-image">
                <img src={image}></img>
            </div>
            <div>
                <p>{name}</p>
                <p>{artist}</p>
                <input value={name}></input>
            </div>
            <input value={artist}></input>
            <div>
                <LikeOptions 
                id={id}
                liked={liked}
                likeState={likeState}
                setLikeState={setLikeState}
                />
                <p>Add to Playlist</p>
                <p>Share</p>
            </div>
        </div>
    )
} 

export default TrackModal