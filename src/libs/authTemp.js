// memory sementara untuk contoh, bisa diganti Redis/db untuk production
const tempSessions = new Map();

function cryptoRandomString(length) {
  return [...Array(length)]
    .map(() => Math.floor(Math.random() * 36).toString(36))
    .join("");
}

export function createTempAuth(userData, expireSec = 300) {
  const token = cryptoRandomString(32);
  const expireAt = Date.now() + expireSec * 1000;
  tempSessions.set(token, { userData, expireAt });
  return token;
}

export function getTempAuth(token) {
  const session = tempSessions.get(token);
  if (!session) return null;
  if (Date.now() > session.expireAt) {
    tempSessions.delete(token);
    return null;
  }
  return session.userData;
}

export function deleteTempAuth(token) {
  tempSessions.delete(token);
}
