import { normalize, schema } from "normalizr";

const owner = new schema.Entity("users");
const genre = new schema.Entity("genres");

export const track = new schema.Entity("tracks", {
  owner: owner,
  genres: genre,
});

export function normalizeTracks(tracks) {
  return normalize(tracks, [track]);
}
