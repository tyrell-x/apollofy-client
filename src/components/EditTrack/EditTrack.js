import {useState} from "react"
import * as AiIcons from "react-icons/ai";
import LikeButton from "../LikeButton"
import DeleteButton from "../DeleteButton"
import {selectTrack} from "../../redux/tracks/track-selectors"
import {useDispatch, useSelector} from "react-redux"
import { toggleLikeTrack } from "../../redux/tracks/track-actions";

function EditTrack({id, closeModal}){
    const dispatch = useDispatch()
    
    const {thumbnail, name, title, ownedBy, liked} = useSelector(selectTrack(id))
    const [edit, setEdit] = useState(false)
    
    const [edittedTitle, setTitle] = useState(title)

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

    const onLikeButtonClick = () => {
        //TODO: Submit form for upload
        dispatch(toggleLikeTrack(id))
    }
    
    return(
        <>
            <div onClick={()=>closeModal()}>
                <AiIcons.AiOutlineClose />
            </div>
            <div className="options-image">
                <img alt="thumbnail" src={thumbnail}></img>
            </div>
            <div>
                { !edit ?
                <div>
                    <p>{name}</p>
                    <p>{ownedBy}</p>
                    <button onClick={editDetails}>Edit</button>
                </div>
                :
                <div>
                    <input placeholder={name} onChange={editTitle}></input>
                    <button onClick={submitChanges}>Submit Changes</button>
                </div>
                }
                <LikeButton 
                onClick={onLikeButtonClick} 
                liked={liked}
                />
                <DeleteButton/>
                <p>Add to Playlist</p>
                <p>Share</p>
            </div>
        </>
    )
} 

export default EditTrack