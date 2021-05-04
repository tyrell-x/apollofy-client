import { normalize, schema } from "normalizr";

const playlist = new schema.Entity("playlists", {}, { idAttribute: "_id" });

export function normalizePlaylists(playlists) {
  return normalize(playlists, [playlist]);
}
