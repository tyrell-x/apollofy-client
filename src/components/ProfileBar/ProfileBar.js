import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../redux/profile/profile-actions";
import "./ProfileBar.scss"


function ProfileBar ({toggleState, toggleTab}) {

    const profile = useSelector((state) => state.profile)

    return (
        <div className="profile-bar">
            <div className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={()=>toggleTab(1)}>
               <p>{profile.data.playlists}</p> 
               <p>playlists</p>
            </div>
            <div className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={()=>toggleTab(2)}>
               <p>{profile.data.followers}</p> 
               <p>Followers</p>
            </div>
            <div className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={()=>toggleTab(3)}>
               <p>{profile.data.following}</p> 
               <p>Following</p>
            </div>
        </div>
    )
}

export default ProfileBar