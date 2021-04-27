import React, {useState, useEffect} from "react"
import * as AiIcons from "react-icons/ai";
import api from "../../api-test/api-test"
import * as FiIcons from "react-icons/fi"
import LikeOptions from "../LikeOptions"
import DeleteOptions from "../DeleteOptions"

function TrackModal({id, image, name, artist, liked, likeState, setLikeState, deleteState, setDeleteState,setOpen}){
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
                <img src={image}></img>
            </div>
            <div>
                { !edit ?
                <div>
                    <p>{name}</p>
                    <p>{artist}</p>
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
                likeState={likeState}
                setLikeState={setLikeState}
                />
                <DeleteOptions
                id={id}
                deleteState={deleteState}
                setDeleteState={setDeleteState}
                />
                <p>Add to Playlist</p>
                <p>Share</p>
            </div>
        </div>
    )
} 

export default TrackModal