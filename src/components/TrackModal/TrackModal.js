import React, {useState, useEffect} from "react"
import api from "../../api-test/api-test"

function TrackModal({id}){
    const [trackInfo, setTrackInfo] = useState([])

    useEffect(() => {
        async function getTrackInfo(id) {
            const songInfo = await api.getTrackInfo(id=id);
            setTrackInfo(songInfo);
            console.log(id)
        }
        getTrackInfo(id=8);
    }, [])

    return(
        <div>
            TrackInfo
        </div>
    )
} 

export default TrackModal