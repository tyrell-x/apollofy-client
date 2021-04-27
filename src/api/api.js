import { makeRequest } from "./api-utils";

function makeApi(request = makeRequest()) {
  function signUp(user, headers) {
    return request({
      body: user,
      url: "/sign-up",
      requestMethod: "POST",
      headers: headers,
    });
  }

  function signOut(headers) {
    return request({
      url: "/sign-out",
      requestMethod: "POST",
      headers: headers,
    });
  }

  function updateUserInfo(headers, userInfo) {
    return request({
      url: "/edit-profile",
      requestMethod: "PATCH",
      headers: headers,
      body: userInfo,
    });
  }

  function createTrack({ body, headers = {} }) {
    return request({
      url: "/tracks",
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
      url: "/me/tracks/liked",
      requestMethod: "GET",
      headers: headers,
    });
  }
  function getTracks(headers) {
    return request({
      url: "/tracks",
      requestMethod: "GET",
      headers: headers,
    });
  }

  function getTrackInfo(headers, id = 7) {
    return request({
      url: `/tracks/${id}`,
      requestMethod: "GET",
      headers: headers,
    });
  }
  function likeTrackToggle(headers, id = 7) {
    return request({
      url: `/tracks/${id}/like`,
      requestMethod: "PUT",
      headers: headers,
    });
  }

  return {
    signUp: signUp,
    signOut: signOut,
    updateUserInfo: updateUserInfo,
    createTrack: createTrack,
  };
}

export default makeApi();
