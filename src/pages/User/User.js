import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import TabMenu from "./TabMenu"
import {useDispatch, useSelector} from 'react-redux'
import {fetchProfileInfo} from "../../redux/profile/profile-actions"
import { onAuthStateChanged } from "../../services/auth/auth.js";
import profileApi from "../../api/profile-api"
import {selectUser} from "../../redux/users/users-selectors"

import "./User.scss"

function User () {
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = useSelector(selectUser(id))
    useEffect(()=> {
        onAuthStateChanged((user) => {
            if (user) {

            }
        });
    }, []) 
       
    return (
        <>
        <div className="profile">
            <div className="profile-container">
                <div className="profile-info-container">
                    <div className="profile-image">
                        <img src={user.pictureUrl ? user.pictureUrl : "http://apollo.eu-west-3.elasticbeanstalk.com/content/images/svg/default-user.svg"}></img>
                    </div>
                    <div className="profile-info">
                        <p className="profile-info-title">PROFILE</p>
                        <p className="profile-info-name">{user.firstName ? user.firstName : user.email}</p>
                        <p className="profile-info-email">{user.email}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="library-tabs library-tabs-profile">
            <TabMenu params={id} followers={user.followedBy} following={user.following}/>
        </div>
        </>
    )
}

export default User