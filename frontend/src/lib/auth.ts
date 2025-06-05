// トークンを localStorage に保存
export function saveAuthTokens(
  accessToken: string,
  client: string,
  uid: string
) {
  localStorage.setItem("access-token", accessToken);
  localStorage.setItem("client", client);
  localStorage.setItem("uid", uid);
}

// トークンを削除
export function clearAuthTokens() {
  localStorage.removeItem("access-token");
  localStorage.removeItem("client");
  localStorage.removeItem("uid");
}

// トークンを取得
export function getAuthTokens() {
  return {
    accessToken: localStorage.getItem("access-token"),
    client: localStorage.getItem("client"),
    uid: localStorage.getItem("uid"),
  };
}
// Basic認証
import type { NextApiRequest, NextApiResponse } from "next";

export function requireBasicAuth(
  req: NextApiRequest,
  res: NextApiResponse
): boolean {
  const auth = req.headers.authorization;

  if (!auth) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
    res.statusCode = 401;
    res.end("Authentication required.");
    return false;
  }

  const base64Credentials = auth.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf8");
  const [username, password] = credentials.split(":");

  const validUsername = process.env.BASIC_AUTH_USER;
  const validPassword = process.env.BASIC_AUTH_PASS;

  if (username !== validUsername || password !== validPassword) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
    res.statusCode = 401;
    res.end("Invalid credentials.");
    return false;
  }

  return true;
}
