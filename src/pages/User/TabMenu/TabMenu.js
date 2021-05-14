import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import{fetchAllUsers} from "../../../redux/users/users-actions"
import Tab from "../../../components/Tab";
import Tabs from "../../../components/Tabs";
import Playlists from "../sections/Playlists"
import UserCard from "../../../components/UserCard"

function TabMenu({followers, following, uid}) {

  return (
    <Tabs reset={uid}>
      <Tab label="Playlists">
        <Playlists uid={uid}/>
      </Tab>
      <Tab label={followers ? followers.length + " Followers": "Followers"}>
          {followers && followers.map(id => (
            <UserCard
              key={id}
              id={id} 
            />
          ))}
      </Tab>
      <Tab label={following ? following.length + " Following": "Following"}>
          {following && following.map(id => (
            <UserCard 
              key={id}
              id={id}
            />
          ))}
      </Tab>
    </Tabs>
  );
}

export default TabMenu;
