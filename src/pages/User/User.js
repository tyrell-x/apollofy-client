import React, {useEffect} from 'react'
import { useParams } from "react-router-dom";
import TabMenu from "./TabMenu"
import {useDispatch, useSelector} from 'react-redux'
import { onAuthStateChanged } from "../../services/auth/auth.js";
import {selectUser} from "../../redux/users/users-selectors"

import "./User.scss"
import { fetchUser } from '../../redux/users/users-actions.js';
import { selectCurrentUserId } from '../../redux/auth/auth-selectors.js';

function User () {
    const dispatch = useDispatch();
    const { id: paramId } = useParams();
    const uid = useSelector(selectCurrentUserId)

    const id = paramId || uid;


    console.log(id)
    const user = useSelector(selectUser(id))

    useEffect(()=> {
        onAuthStateChanged((current) => {
            if (current) {
                dispatch(fetchUser(current.uid))
            }
        });
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchUser(id))
        
    }, [dispatch, id])
       
    return (
        <>
        <div className="profile">
            <div className="profile-container">
                <div className="profile-info-container">
                    <div className="profile-image">
                        <img alt="user" src={user.pictureUrl ? user.pictureUrl : "http://apollo.eu-west-3.elasticbeanstalk.com/content/images/svg/default-user.svg"}></img>
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