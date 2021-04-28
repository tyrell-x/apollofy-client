import { makeRequest } from "./api-utils";

function makeApi(request = makeRequest()) {
  function signUp(user, headers) {
    return request({
      body: user,
      url: "/user/me/sign-up",
      requestMethod: "POST",
      headers: headers,
    });
  }

  function signOut(headers) {
    return request({
      url: "/user/me/sign-out",
      requestMethod: "POST",
      headers: headers,
    });
  }

  function updateUserInfo(headers, userInfo) {
    return request({
      url: "/user/me/edit",
      requestMethod: "PATCH",
      headers: headers,
      body: userInfo,
    });
  }

  function createTrack({ body, headers = {} }) {
    return request({
      url: "/track",
      requestMethod: "POST",
      body: body,
      headers: headers,
    });
  }

  function getProfileInfo(headers) {
    return request({
      url: "/account",
      requestMethod: "GET",
      headers: headers,
    });
  }

  function getTracksLiked(headers) {
    return request({
      url: "/user/me/tracks/liked",
      requestMethod: "GET",
      headers: headers,
    });
  }
  function getTracks(headers) {
    return request({
      url: "/track",
      requestMethod: "GET",
      headers: headers,
    });
  }

  function getTrackInfo(headers, id) {
    return request({
      url: `/track/${id}`,
      requestMethod: "GET",
      headers: headers,
    });
  }
  function likeTrackToggle(headers, id) {
    return request({
      url: `/user/me/liketrack?trackId=${id}`,
      requestMethod: "POST",
      headers: headers,
    });
  }

  return {
    signUp: signUp,
    signOut: signOut,
    updateUserInfo: updateUserInfo,
    createTrack: createTrack,
    getProfileInfo: getProfileInfo,
    getTracksLiked: getTracksLiked,
    getTracks: getTracks,
    getTrackInfo: getTrackInfo,
    likeTrackToggle: likeTrackToggle
  };
}

export default makeApi();
