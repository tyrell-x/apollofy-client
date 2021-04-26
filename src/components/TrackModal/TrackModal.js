import React, {useState, useEffect} from "react"
import api from "../../api-test/api-test"

function TrackModal({id, liked}){
    const [trackInfo, setTrackInfo] = useState([])

    // useEffect(() => {
    //     async function getTrackInfo(id) {
    //         const songInfo = await api.getTrackInfo( "", id);
    //         setTrackInfo(songInfo);
    //         console.log(songInfo)
    //     }
    //     getTrackInfo(id);
    // }, [])

    return(
        <div>
        </div>
    )
} 

export default TrackModal