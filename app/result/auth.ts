export const resultAccessCookie = "result_access";

const ACCESS_PAYLOAD = "kkmu-result-access";
const ACCESS_SECRET = "deepesh-result-route-v1";
const encoder = new TextEncoder();

const PASSWORD_HASHES = [
  "a001e3bec7e0b4502514b31ca6ea66a94a4578c91efb56bbde1420d348618532",
  "d82f1cb13c3a8149affcbacde14c8fc8719edcd9ddc69c3c0cdc407f5965ffdf",
  "3b49e09e4dbac748865ed518f47d960c74a7b71836ebfe978d49c276f17acc04",
  "6595f26ee2bcf9c9ae80026e03da09abe62aa7fe559531f4a85e80daf5b11a29",
];

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualHex(left: string, right: string) {
  if (left.length !== right.length) {
    return false;
  }

  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return mismatch === 0;
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return toHex(digest);
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(ACCESS_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return toHex(signature);
}

export async function buildAccessToken() {
  return `${ACCESS_PAYLOAD}.${await sign(ACCESS_PAYLOAD)}`;
}

export async function isValidPassword(password: string) {
  const passwordHash = await sha256(password);
  return PASSWORD_HASHES.some((hash) => timingSafeEqualHex(hash, passwordHash));
}

export async function isValidAccessToken(token?: string) {
  if (!token) {
    return false;
  }

  const [payload, signature] = token.split(".");
  if (!payload || !signature) {
    return false;
  }

  const expected = await sign(payload);
  return (
    payload === ACCESS_PAYLOAD &&
    timingSafeEqualHex(signature, expected)
  );
}
