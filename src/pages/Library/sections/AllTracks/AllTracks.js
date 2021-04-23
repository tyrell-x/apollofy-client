import React, {useState, useEffect} from "react"
import "../../../../components/LibraryContent/LibraryContent.scss"
import LibraryItem from "../../../../components/LibraryItem"
import api from "../../../../api-test/api-test"

function AllTracks() {
    const [allTracks, setAllTracks] = useState([])

    useEffect(() => {
        async function getAllTracks () {
            const allSongs = await api.getTracks()
            setAllTracks(allSongs)
            console.log(allTracks)
        }
        getAllTracks()
    }, [])

    return (
        <div className="library-content">
            {allTracks.data && allTracks.data.map(track =>
                <LibraryItem 
                name={track.name}
                artist={track.owner.login}
                image={track.thumbnail}
                />
                )}
        </div>
        
    )
}

export default AllTracks