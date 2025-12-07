import { getAccessToken, setAccessToken } from "../auth/token.js";

export async function useFetch(url, options = {}) {
  const token = getAccessToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  let res = await fetch(url, {
    ...options,
    headers
  });

  if (res.status === 401) {
    const newToken = await refreshAccessToken();
    if (!newToken) {
      window.location.href = "/login";
      return;
    }

    res = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        Authorization: `Bearer ${newToken}`
      }
    });
  }

  return res;
}

async function refreshAccessToken() {
  const res = await fetch("/auth/refresh", { method: "POST", credentials: "include" });

  if (!res.ok) return null;

  const data = await res.json();
  setAccessToken(data.accessToken);
  return data.accessToken;
}
