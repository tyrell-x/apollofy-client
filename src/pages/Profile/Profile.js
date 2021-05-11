import React, {useEffect} from 'react'
import TabMenu from "./TabMenu"
import api from "../../api/profile-api";
import "./Profile.scss"

function Profile () {
    async function getUserData () {
        const data = await api.getUserInfo()
        console.log(data)
      }
    useEffect(()=> {
        getUserData()
      }, [])
    
    return (
        <>
        <div className="profile">
            <div className="profile-container">
                <div className="profile-info-container">
                    <div className="profile-image">
                        <img src="http://apollo.eu-west-3.elasticbeanstalk.com/content/images/svg/default-user.svg"></img>
                    </div>
                    <div className="profile-info">
                        <p className="profile-info-title">PROFILE</p>
                        <p className="profile-info-name">Ignacio Fernandez</p>
                        <p className="profile-info-email">Prueba@gmail.com</p>
                    </div>
                </div>
                <div className="edit-profile-button-container">
                    <button className="edit-profile-button">Edit Profile</button>
                </div>
            </div>
        </div>
        <div className="library-tabs">
            <TabMenu />
        </div>
        </>
    )
}

export default Profile