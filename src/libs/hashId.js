import Hashids from "hashids";

const SALT = process.env.HASHID_SALT || "target2026-secret-hash-id";
const LENGTH = 10; // panjang minimal hasil hash

const hashids = new Hashids(SALT, LENGTH);

/**
 * @param {number} id
 * @returns {string} hash
 */
export function encodeId(id) {
  return hashids.encode(id);
}

/**
 * @param {string} hash
 * @returns {number|null}
 */
export function decodeId(hash) {
  const result = hashids.decode(hash);
  return result.length ? result[0] : null;
}
