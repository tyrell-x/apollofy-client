import React from "react";
import Tab from "../../../components/Tab";
import Tabs from "../../../components/Tabs";
import MyPlaylists from "../sections/MyPlaylists"
import UserCard from "../../../components/UserCard"

function TabMenu({followers, following}) {
  return (
    <Tabs>
      <Tab label="My Playlists">
        <MyPlaylists />
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
