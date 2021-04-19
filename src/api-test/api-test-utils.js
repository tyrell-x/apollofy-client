import axios from "axios";

export function createDefaultResponse() {
  return {
    isSuccessful: false,
    data: null,
    errorMessage: null,
  };
}

export async function normalizeResponse(promise = Promise.resolve) {
  const defaultResponse = createDefaultResponse();
  let networkResponse = null;

  try {
    networkResponse = await promise;
    defaultResponse.data = networkResponse.data;
  } catch (error) {
    defaultResponse.errorMessage = error.message;
  }

  return defaultResponse;
}

export function makeRequest(
  httpClient = axios,
  baseURL = "http://apollo.eu-west-3.elasticbeanstalk.com/api",
  baseHeaders = {
    Accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpZ25hY2lvIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTYyMTAxMDY3MH0.Gh8k7p16OIboZnzlnllckdEIdp98JWNU7NKReyrzkCjMGWCX4TOsk49g3YESVsPQde_v32lW7tPAEJS1byep-g" ,
  },
) {
  return async function request({
    url = "/",
    requestMethod = "GET",
    body = {},
    headers = {},
  }) {
    return normalizeResponse(
      httpClient({
        url: baseURL + url,
        method: requestMethod,
        data: body,
        headers: {
          ...baseHeaders,
          ...headers,
        },
        validateStatus: function validateStatus(status) {
          // Resolve only if the status code is in the 200 range
          return status >= 200 && status < 400;
        },
      }),
    );
  };
}
