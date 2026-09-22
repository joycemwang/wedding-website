// Minimal Google Sheets client for the Workers runtime. The `googleapis`
// SDK relies on Node-only internals (fs, https) that don't exist here, so
// this hand-rolls the service-account auth flow instead: build + sign a
// JWT with Web Crypto, exchange it for an access token, then hit the
// Sheets REST API directly with fetch().
export interface GoogleSheetsEnv {
  GOOGLE_SERVICE_ACCOUNT_EMAIL: string;
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: string;
  GOOGLE_SHEET_ID: string;
}

const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
// Sheet tab names with spaces need single-quoting in an A1-notation range.
const LOG_RANGE = "'Website Tracking'!A:B";

function base64UrlEncodeBytes(bytes: ArrayBuffer | Uint8Array) {
  const buffer = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (const byte of buffer) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlEncodeString(value: string) {
  return base64UrlEncodeBytes(new TextEncoder().encode(value));
}

// Cloudflare's dashboard env var editor collapses real newlines in a
// pasted PEM key into literal "\n" sequences, so both forms need to work.
async function importPrivateKey(pem: string) {
  const normalized = pem.replace(/\\n/g, "\n");
  const base64Body = normalized
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");
  const raw = atob(base64Body);
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);

  return crypto.subtle.importKey(
    "pkcs8",
    bytes,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

async function getAccessToken(env: GoogleSheetsEnv) {
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const claimSet = {
    iss: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    scope: SHEETS_SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };

  const unsigned = `${base64UrlEncodeString(JSON.stringify(header))}.${base64UrlEncodeString(
    JSON.stringify(claimSet),
  )}`;
  const key = await importPrivateKey(env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY);
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(unsigned),
  );
  const jwt = `${unsigned}.${base64UrlEncodeBytes(signature)}`;

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get Google access token: ${response.status} ${await response.text()}`);
  }

  const data = (await response.json()) as { access_token: string };
  return data.access_token;
}

const TIMESTAMP_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  dateStyle: "medium",
  timeStyle: "short",
});

export async function appendLogRow(env: GoogleSheetsEnv, name: string) {
  const accessToken = await getAccessToken(env);
  const timestamp = `${TIMESTAMP_FORMATTER.format(new Date())} ET`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${env.GOOGLE_SHEET_ID}/values/${encodeURIComponent(
    LOG_RANGE,
  )}:append?valueInputOption=USER_ENTERED`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [[timestamp, name]] }),
  });

  if (!response.ok) {
    throw new Error(`Failed to append log row: ${response.status} ${await response.text()}`);
  }
}
