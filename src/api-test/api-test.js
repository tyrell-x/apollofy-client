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

  function getTracks(headers) {
    return request({
      url: "/me/tracks/liked",
      requestMethod: "GET",
      headers: headers,
    });
  }

  return {
    signUp: signUp,
    signOut: signOut,
    getProfileInfo: getProfileInfo,
    getTracks: getTracks
  };
}

export default makeApi();
