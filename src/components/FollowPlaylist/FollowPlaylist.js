import React, {useState, useEffect} from 'react'
import "./FollowPlaylist.scss"

function FollowPlaylist () {
    const [follow, setFollow] = useState(false)
    const followToggle = () => {
        setFollow(!follow)
    }
    return (
        <button className={follow ? "following-button" : "follow-button"} onClick={()=>followToggle()}>
            {follow ? "Following" : "Follow"}
        </button>
    )
}

export default FollowPlaylist