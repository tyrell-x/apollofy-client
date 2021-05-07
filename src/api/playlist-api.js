import { makeRequest } from "./api-utils";

function makeApi(request = makeRequest()) {
  function getAllPlaylists(headers) {
    return request({
      url: "/playlist?fullFetch=true",
      requestMethod: "GET",
      headers: headers,
    });
  }

  function postInPlaylist(headers, id, body) {
    return request({
      url: `/playlist/track?id=${id}`,
      requestMethod: "POST",
      headers: headers,
      body: body,
    });
  }
  function createPlaylist(headers, body) {
    return request({
      url: `/playlist/`,
      requestMethod: "POST",
      headers: headers,
      body: body,
    });
  }

  return {
    getAllPlaylists: getAllPlaylists,
    postInPlaylist: postInPlaylist,
    createPlaylist: createPlaylist
  };
}

export default makeApi();
