import { makeRequest } from "./api-utils";

function makeApi(request = makeRequest()) {
  function getAllUsers(headers) {
    return request({
      url: "/user/",
      requestMethod: "GET",
      headers: headers,
    });
  }

  function getUserById(uid) {
    return request({
      url: `/user/${uid}`,
      requestMethod: "GET"
    });
  }

  function addTrackToPlaylist(trackId, playlistId) {
    return request({
      url: `/playlist/track?id=${playlistId}&track=true`,
      requestMethod: "POST",
      body: { trackId },
    });
  }
  function updateUser(user) {
    return request({
      url: `/playlist/edit/${user._id}`,
      requestMethod: "PUT",
      body: user,
    });
  }

  function followUser(id, followed) {
    return request({
      url: `/user/follow?id=${id}${followed ? "&followed=true" : ""}`,
      requestMethod: "POST",
    });
  }
  return {
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    followUser: followUser,
  };
}

export default makeApi();
