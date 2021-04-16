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

  return {
    signUp: signUp,
    signOut: signOut,
  };
}

export default makeApi();
