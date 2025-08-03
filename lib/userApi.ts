export async function loginUser(email: string, password: string) {
  const loginUrl = (process.env.NEXT_PUBLIC_API_URL || "https://sienna-cod-887616.hostingersite.com/api") + "/auth/login";
  const res = await fetch(loginUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function registerUser(email: string, password: string, name: string) {
  const registerUrl = (process.env.NEXT_PUBLIC_API_URL || "https://sienna-cod-887616.hostingersite.com/api") + "/auth/register";
  const res = await fetch(registerUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });
  return res.json();
}

export async function getCurrentUser(token: string) {
  const meUrl = (process.env.NEXT_PUBLIC_API_URL || "https://sienna-cod-887616.hostingersite.com/api") + "/auth/me";
  const res = await fetch(meUrl, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  return res.json();
}

export async function logoutUser(token: string) {
  const logoutUrl = (process.env.NEXT_PUBLIC_API_URL || "https://sienna-cod-887616.hostingersite.com/api") + "/auth/logout";
  const res = await fetch(logoutUrl, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` },
  });
  return res.json();
}
