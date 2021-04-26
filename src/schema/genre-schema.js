import { normalize, schema } from "normalizr";

const genre = new schema.Entity("genres");

export function normalizeGenres(genres) {
  return normalize(genres, [genre]);
}
