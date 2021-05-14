import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import{fetchAllUsers} from "../../../redux/users/users-actions"
import Tab from "../../../components/Tab";
import Tabs from "../../../components/Tabs";
import MyPlaylists from "../sections/MyPlaylists"
import UserCard from "../../../components/UserCard"

function TabMenu({followers, following, params}) {

  return (
    <Tabs>
      <Tab label="Playlists">
        <MyPlaylists />
      </Tab>
      <Tab label={followers ? followers.length + " Followers": "Followers"}>
          {followers && followers.map(user => (
            <UserCard 
              key={user._id}
              id={user._id} 
              name={user.firstName} 
              image={user.pictureUrl} 
              email={user.email}
            />
          ))}
      </Tab>
      <Tab label={following ? following.length + " Following": "Following"}>
          {following && following.map(user => (
            <UserCard 
              key={user._id}
              id={user._id} 
              name={user.firstName} 
              image={user.pictureUrl} 
              email={user.email}
            />
          ))}
      </Tab>
    </Tabs>
  );
}

export default TabMenu;
