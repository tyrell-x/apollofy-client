import {GET_TRACKS} from "./tracksTypes"

const tracksInitialState = {
    color: "string",
    duration: 0,
    genres: [
      {
        id: 0,
        name: "string"
      }
    ],
    id: 0,
    liked: true,
    likes: 0,
    name: "string",
    owner: {
      activated: true,
      authorities: [
        string
      ],
      createdBy: "string",
      createdDate: "2021-04-27T11:12:29.092Z",
      email: "string",
      firstName: "string",
      followers: 0,
      following: 0,
      id: 0,
      imageUrl: "string",
      langKey: "string",
      lastModifiedBy: "string",
      lastModifiedDate: "2021-04-27T11:12:29.092Z",
      lastName: "string",
      login: "string",
      playlists: 0,
      tracks: 0
    },
    plays: 0,
    released: "2021-04-27T11:12:29.092Z",
    thumbnail: "string",
    url: "string"
}

const tracksReducer = (state = tracksInitialState, action) => {
    switch(action.type) {
        case GET_TRACKS: return {
            ...state
        }

    }
}