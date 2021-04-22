import React, {useState, useEffect} from 'react';
import Navbar from "../../components/Navbar"
import api from "../../api-test/api-test"
import LibraryContent from "../../components/LibraryContent"
import LibraryItem from "../../components/LibraryItem"

function Library () {
    const [toggleState, setToggleState] = useState(1)
    const [tracks, setTracks] = useState([])

    const toggleTab = (index) => {
        setToggleState(index)
    }

    useEffect(() => {
        async function getLibraryPlaylists () {
            const songs = await api.getTracks()
            setTracks(songs)
            console.log(tracks)
        }
        getLibraryPlaylists()
    }, [])
    return (
        <>
            <Navbar />
            <h1>Music</h1>
            <LibraryContent toggleTab={toggleTab} toggleState={toggleState} />
            {tracks.data && tracks.data.map(track =>
            <LibraryItem 
                name={track.name}
                artist={track.owner.login}
                image={track.thumbnail}
            />
                )}
            
        </>
    )
}

export default Library