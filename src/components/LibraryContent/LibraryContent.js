import React from "react"

function LibraryContent({toggleState, toggleTab}) {
    return (
        <div className="Library-bar">
            <div className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={()=>toggleTab(1)}>
            <h2>Tracks Liked</h2>
            </div>
            <div className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={()=>toggleTab(2)}>
            <h2>Playlists</h2>
            </div>
            <div className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={()=>toggleTab(3)}>
            <h2>All Tracks</h2>
            </div>
        </div>
    )
}

export default LibraryContent