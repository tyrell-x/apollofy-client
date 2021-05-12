import React, {useEffect} from 'react'
import { useParams } from "react-router-dom";
import TabMenu from "./TabMenu"
import {useDispatch, useSelector} from 'react-redux'
import {fetchProfileInfo} from "../../redux/profile/profile-actions"
import { onAuthStateChanged } from "../../services/auth/auth.js";

import "./User.scss"

function User () {
    const { id } = useParams()
    const profile = useSelector(state => state.profile.profileInfo)
    const dispatch = useDispatch()
    useEffect(()=> {
        onAuthStateChanged((user) => {
            if (user) {
                dispatch(fetchProfileInfo())
            }
        });
    }, [])    
    
    return (
        <>
        <div className="profile">
            <div className="profile-container">
                <div className="profile-info-container">
                    <div className="profile-image">
                        <img src={profile.pictureUrl ? profile.pictureUrl : "http://apollo.eu-west-3.elasticbeanstalk.com/content/images/svg/default-user.svg"}></img>
                    </div>
                    <div className="profile-info">
                        <p className="profile-info-title">PROFILE</p>
                        <p className="profile-info-name">{profile.firstName ? profile.firstName : profile.email}</p>
                        <p className="profile-info-email">{profile.email}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="library-tabs library-tabs-profile">
            <TabMenu followers={profile.followedBy} following={""}/>
        </div>
        </>
    )
}

export default User