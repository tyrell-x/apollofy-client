import { normalize, schema } from "normalizr";

export const user = new schema.Entity("users");

export function normalizeUsers(users) {
  return normalize(users, [user]);
}
