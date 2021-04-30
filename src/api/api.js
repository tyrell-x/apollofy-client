import { makeRequest } from "./api-utils";

function makeApi(request = makeRequest()) {
  function signUp(user) {
    return request({
      body: user,
      url: "/user/me/sign-up",
      requestMethod: "POST",
    });
  }

  function signOut() {
    return request({
      url: "/user/me/sign-out",
      requestMethod: "POST",
    });
  }

  function updateUser(user) {
    return request({
      url: "/user/me/edit",
      requestMethod: "PATCH",
      body: user,
    });
  }

  function createTrack(track) {
    return request({
      url: "/track",
      requestMethod: "POST",
      body: track,
    });
  }

  function deleteTrack(id) {
    return request({
      url: `/track/${id}`,
      requestMethod: "DELETE",
    });
  }

  function getProfileInfo() {
    return request({
      url: "/account",
      requestMethod: "GET",
    });
  }

  function getLikedTracks() {
    return request({
      url: "/user/me/tracks/liked",
      requestMethod: "GET",
    });
  }
  function getTracks() {
    return request({
      url: "/track",
      requestMethod: "GET",
    });
  }

  function editTrack(id, track) {
    return request({
      url: `/track/edit/${id}`,
      requestMethod: "PATCH",
      body: track,
    });
  }

  function getTrackInfo(id) {
    return request({
      url: `/track/${id}`,
      requestMethod: "GET",
    });
  }
  function likeTrackToggle(id, liked) {
    return request({
      url: `/user/me/liketrack?trackId=${id}&liked=${liked}`,
      requestMethod: "POST",
    });
  }

  return {
    signUp: signUp,
    signOut: signOut,
    updateUser: updateUser,
    createTrack: createTrack,
    deleteTrack: deleteTrack,
    getProfileInfo: getProfileInfo,
    getLikedTracks: getLikedTracks,
    getTracks: getTracks,
    getTrackInfo: getTrackInfo,
    likeTrackToggle: likeTrackToggle,
    editTrack: editTrack,
  };
}

export default makeApi();
