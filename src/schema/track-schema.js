import { normalize, schema } from "normalizr";

export const track = new schema.Entity("tracks", {}, { idAttribute: "id" });

export function normalizeTracks(tracks) {
  return normalize(tracks, [track]);
}