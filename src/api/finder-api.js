import { makeRequest } from "./api-utils";

function makeApi(request = makeRequest()) {
  function find(text) {
    return request({
      url: `/search?text=${text}`,
      requestMethod: "GET"
    });
  }
  
  return {
    find: find,
  };
}

export default makeApi();
