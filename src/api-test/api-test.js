import { makeRequest } from "./api-test-utils";

function makeApi(request = makeRequest()) {
  function signUp(headers) {
    return request({
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

  function deleteTrack(headers, id) {
    return request({
      url: `/tracks/${id}`,
      requestMethod: "DELETE",
      headers: headers,
    });
  }

  return {
    signUp: signUp,
    signOut: signOut,
    getProfileInfo: getProfileInfo,
    getTracks: getTracks,
    getTracksLiked: getTracksLiked,
    getTrackInfo: getTrackInfo,
    likeTrackToggle: likeTrackToggle,
    deleteTrack: deleteTrack
  };
}

export default makeApi();
