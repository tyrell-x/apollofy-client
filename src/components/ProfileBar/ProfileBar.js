import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../redux/profile/profile-actions";
import "./ProfileBar.scss"


const BarElement = ({id, number, text, active, handleClick}) => {    
        return(
            <div id={id} className={active ? "activo" : null} onClick={()=>handleClick}>
               <p>{number}</p> 
               <p>{text}</p>
            </div>
        )
    
}

function ProfileBar () {

    const profile = useSelector((state) => state.profile)
    const [active, setActive] = useState({
        components: [
            {id: 1, number: profile.data.playlists, text: "Playlists"},
            {id: 2, number: profile.data.followers, text: "Followers"},
            {id: 3, number: profile.data.following, text: "Following"}
        ],
        activeID: null
    })

    const handleClick = (e) => {
        if (active.activeID !== null) return;

            const id = parseInt(e.target.id);
            setActive({
                activeID: id
            })
            console.log(id)
        
    }

    return (
        <div className="profile-bar">
        {active.components.map(component =>
        <BarElement
            key={component.id}
            id={component.id}
            active={component.id == active.activeID}
            number={component.number}
            text={component.text}
            handleClick={handleClick}
        />
        
        )}
        </div>
    )
}

export default ProfileBar