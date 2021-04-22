import React from "react"
import "./LibraryContent.scss"
function LibraryContent({toggleState, toggleTab}) {
    return (
        <div className="library-bar">
            <div className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={()=>toggleTab(1)}>
            <p className="bar-item">Tracks Liked</p>
            </div>
            <div className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={()=>toggleTab(2)}>
            <p className="bar-item">Playlists</p>
            </div>
            <div className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={()=>toggleTab(3)}>
            <p className="bar-item">My Tracks</p>
            </div>
        </div>
    )
}

export default LibraryContent