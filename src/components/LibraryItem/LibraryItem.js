import React from 'react'
import "./TrackItem.scss"
function LibraryItem ({name, artist, image}) {
    return (
        <div className="track-card">
            <img src={image} className="track-image"></img>
            <div className="track-details">
                <p className="track-name">{name}</p>
                <p className="track-artist">{artist}</p>
            </div>
            
        </div>
    )
}

export default LibraryItem