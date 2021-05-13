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
  function updatePlaylist(playlist) {
    return request({
      url: `/playlist/edit/${playlist._id}`,
      requestMethod: "PUT",
      body: playlist,
    });
  }
  function editPlaylist(id, playlist) {
    return request({
      url: `/playlist/edit/${id}`,
      requestMethod: "PUT",
      body: playlist,
    });
  }
  function createPlaylist(playlist) {
    return request({
      url: `/playlist/`,
      requestMethod: "POST",
      body: playlist,
    });
  }
  function followPlaylist(id, followed) {
    return request({
      url: `/playlist/follow?id=${id}${followed ? "&followed=true" : ""}`,
      requestMethod: "POST",
    });
  }
  function deletePlaylist(playlistId) {
    return request({
      url: `/playlist/${playlistId}`,
      requestMethod: "DELETE",
    });
  }
  return {
    getAllPlaylists: getAllPlaylists,
    addTrackToPlaylist: addTrackToPlaylist,
    createPlaylist: createPlaylist,
    followPlaylist: followPlaylist,
    updatePlaylist: updatePlaylist,
    editPlaylist: editPlaylist,
    deletePlaylist: deletePlaylist
  };
}

export default makeApi();
