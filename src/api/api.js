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

  function updateUserInfo(headers, options) {
    console.log(headers);
    console.log(options);
    return request({
      url: "/account",
      requestMethod: "PATCH",
      headers: headers,
      body: options,
    });
  }

  return {
    signUp: signUp,
    signOut: signOut,
    updateUserInfo: updateUserInfo,
  };
}

export default makeApi();
