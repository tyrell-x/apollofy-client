import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./ProfileInfo.scss"

function ProfileInfo () {
    const profile = useSelector((state) => state.profile)
    return (
        <div className="profile-info">
            <img src={profile.data.imageUrl ? profile.data.imageUrl : "http://apollo.eu-west-3.elasticbeanstalk.com/content/images/svg/default-user.svg"}></img>
            <div className="profile-name-email">
                <h2>{profile.data.login}</h2>
                <h3>{profile.data.email}</h3>
            </div>
            <Link to="/profile/edit">
                <div className="profile-edit-button">Editar Perfil</div>
            </Link>   
        </div>
        
    )
}

export default ProfileInfo