import React from 'react'

function LibraryItem ({name, artist, image}) {
    return (
        <div>
            <img src={image}></img>
            <h2>{name}</h2>
            <p>{artist}</p>
        </div>
    )
}

export default LibraryItem