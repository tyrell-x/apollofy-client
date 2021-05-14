import React, {useEffect} from 'react'
import { Link } from "react-router-dom";
import TabMenu from "./TabMenu"
import {useDispatch, useSelector} from 'react-redux'
import {fetchAllUsers, fetchUser} from "../../redux/users/users-actions"
import { onAuthStateChanged } from "../../services/auth/auth.js";

import "./Profile.scss"
import { currentUserSelector } from '../../redux/auth/auth-selectors.js';

function Profile () {
    const profile = useSelector(currentUserSelector)

    const dispatch = useDispatch()
    useEffect(()=> {
        onAuthStateChanged((user) => {
            if (user) {
                dispatch(fetchUser(user.uid))
            }
        });
    }, [dispatch, profile._id])    
    
    return (
        <>
        <div className="profile">
            <div className="profile-container">
                <div className="profile-info-container">
                    <div className="profile-image">
                        <img alt="profile" src={profile.pictureUrl ? profile.pictureUrl : "http://apollo.eu-west-3.elasticbeanstalk.com/content/images/svg/default-user.svg"}></img>
                    </div>
                    <div className="profile-info">
                        <p className="profile-info-title">PROFILE</p>
                        <p className="profile-info-name">{profile.firstName ? profile.firstName : profile.email}</p>
                        <p className="profile-info-email">{profile.email}</p>
                    </div>
                </div>
                <div className="edit-profile-button-container">
                    <Link to="/account">
                    <button className="edit-profile-button">Edit Profile</button>
                    </Link>
                </div>
            </div>
        </div>
        <div className="library-tabs library-tabs-profile">
            <TabMenu followers={profile.followedBy} following={profile.following}/>
        </div>
        </>
    )
}

export default Profile