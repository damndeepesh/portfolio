import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const resultAccessCookie = "result_access";

const ACCESS_PAYLOAD = "kkmu-result-access";
const ACCESS_SECRET = "deepesh-result-route-v1";

const PASSWORD_HASHES = [
  "a001e3bec7e0b4502514b31ca6ea66a94a4578c91efb56bbde1420d348618532",
  "d82f1cb13c3a8149affcbacde14c8fc8719edcd9ddc69c3c0cdc407f5965ffdf",
  "3b49e09e4dbac748865ed518f47d960c74a7b71836ebfe978d49c276f17acc04",
  "6595f26ee2bcf9c9ae80026e03da09abe62aa7fe559531f4a85e80daf5b11a29",
];

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function sign(value: string) {
  return createHmac("sha256", ACCESS_SECRET).update(value).digest("hex");
}

export function buildAccessToken() {
  return `${ACCESS_PAYLOAD}.${sign(ACCESS_PAYLOAD)}`;
}

export function isValidPassword(password: string) {
  const passwordHash = sha256(password);

  return PASSWORD_HASHES.some(
    (hash) =>
      hash.length === passwordHash.length &&
      timingSafeEqual(Buffer.from(hash), Buffer.from(passwordHash)),
  );
}

export function isValidAccessToken(token?: string) {
  if (!token) {
    return false;
  }

  const [payload, signature] = token.split(".");
  if (!payload || !signature) {
    return false;
  }

  const expected = sign(payload);
  return (
    payload === ACCESS_PAYLOAD &&
    signature.length === expected.length &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  );
}
