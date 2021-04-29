import { normalize, schema } from "normalizr";

export const track = new schema.Entity("tracks", {}, { idAttribute: "_id" });

export function normalizeTracks(tracks) {
  return normalize(tracks, [track]);
}
