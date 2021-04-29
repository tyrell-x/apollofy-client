import { makeRequest } from "./api-utils";

function makeApi(request = makeRequest()) {

  function getAllPlaylists(headers) {
    return request({
      url: '/playlist',
      requestMethod: "GET",
      headers: headers,
    });
  }

  return {
    getAllPlaylists: getAllPlaylists
  };
}

export default makeApi();
