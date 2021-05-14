import React from 'react'
import {Link} from 'react-router-dom'
import "./UserCard.scss"
import FollowUser from "../FollowUser"

function UserCard({id, name, image, email}) {
    return (
        <div className="user-card-container">
            <Link to={`/profile/${id}`}>
                <div className="user-card">
                    <div className="user-image-container">
                        <img className="user-image" src={image ? image : "http://apollo.eu-west-3.elasticbeanstalk.com/content/images/svg/default-user.svg"}></img>
                    </div>
                    <div className="user-info">
                        <p className="user-name">{name}</p>
                        <p className="user-email">{email}</p>
                    </div>
                </div>
            </Link>
            <div className="follow-user">
                <FollowUser id={id} />
            </div>
        </div>
    )
}

export default UserCard