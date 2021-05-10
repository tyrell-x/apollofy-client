import { makeRequest } from "./api-utils";

function makeApi(request = makeRequest()) {
  function getAllPlaylists(headers) {
    return request({
      url: "/playlist?fullFetch=true",
      requestMethod: "GET",
      headers: headers,
    });
  }

  function addTrackToPlaylist(trackId, playlistId) {
    return request({
      url: `/playlist/track?id=${playlistId}&track=true`,
      requestMethod: "POST",
      body: { trackId },
    });
  }
  function createPlaylist(playlist) {
    return request({
      url: `/playlist/`,
      requestMethod: "POST",
      body: playlist,
    });
  }

  return {
    getAllPlaylists: getAllPlaylists,
    addTrackToPlaylist: addTrackToPlaylist,
    createPlaylist: createPlaylist,
  };
}

export default makeApi();
