import React, {useState, useEffect} from "react"
import * as AiIcons from "react-icons/ai";
import api from "../../api/api"
import * as FiIcons from "react-icons/fi"
import LikeOptions from "../LikeOptions"
import DeleteOptions from "../DeleteOptions"
import {selectTrack} from "../../redux/tracks/track-selectors"
import {useSelector} from "react-redux"

function TrackModal({id, open, setOpen}){
    const {thumbnail, name, owner:{login}, liked} = useSelector(selectTrack(id))
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState("")

    const editDetails = () => {
        setEdit(!edit)
    }
    const editTitle = (e) => {
        setTitle(e.target.value)
    }
    const submitChanges = () => {
        console.log("changes submitted")
        setEdit(!edit)
    }
    console.log(title)
    console.log(edit)
    return(
        <div className="track-options-modal">
            <div onClick={()=>setOpen(false)}>
                <AiIcons.AiOutlineClose />
            </div>
            <div className="options-image">
                <img src={thumbnail}></img>
            </div>
            <div>
                { !edit ?
                <div>
                    <p>{name}</p>
                    <p>{login}</p>
                    <button onClick={editDetails}>Edit</button>
                </div>
                :
                <div>
                    <input placeholder={name} onChange={editTitle}></input>
                    <button onClick={submitChanges}>Submit Changes</button>
                </div>
                }
                <LikeOptions 
                id={id}
                liked={liked}
                />
                <DeleteOptions
                id={id}
                />
                <p>Add to Playlist</p>
                <p>Share</p>
            </div>
        </div>
    )
} 

export default TrackModal