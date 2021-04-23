import React, {useState, useEffect} from 'react';
import Navbar from "../../components/Navbar"
import api from "../../api-test/api-test"
import LibraryContent from "../../components/LibraryContent"
import LibraryItem from "../../components/LibraryItem"
import TabMenu from '../Library/sections/TabMenu';

function Library () {
    const [toggleState, setToggleState] = useState(1)
    const [tracks, setTracks] = useState([])
    const [allTracks, setAllTracks] = useState([])


    const toggleTab = (index) => {
        setToggleState(index)
    }

    useEffect(() => {
        async function getLikedTracks () {
            const songs = await api.getTracksLiked()
            setTracks(songs)
            console.log(tracks)
        }
        getLikedTracks()
        async function getAllTracks () {
            const allSongs = await api.getTracks()
            setAllTracks(allSongs)
            console.log(allTracks)
        }
        getAllTracks()
    }, [])
    return (
        <div className="library-background">
            <Navbar />
            <h1>My Library</h1>
            <TabMenu />
        </div>
        
    )
}

export default Library