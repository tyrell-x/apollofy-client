import { makeRequest } from "./api-utils";

function makeApi(request = makeRequest()) {

  function getUserInfo() {
    return request({
      url: 'user/me',
      requestMethod: "GET",
    });
  }
  
  return {
    getUserInfo: getUserInfo
  };
}

export default makeApi();