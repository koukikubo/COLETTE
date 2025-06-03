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
