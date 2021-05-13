import { makeRequest } from "./api-utils";

function makeApi(request = makeRequest()) {

    function getProfileInfo() {
        return request({
          url: "/user/me",
          requestMethod: "GET",
        });
      }

    function getUserInfo(id) {
      return request({
        url: `/user/${id}`,
        requestMethod: "GET",
      });
    }

  return {
    getProfileInfo: getProfileInfo,
    getUserInfo: getUserInfo,
  };
}

export default makeApi();