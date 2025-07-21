"use client";
import { useEffect } from "react";

export function TokenHandler() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const token = url.searchParams.get("token");
      const user = url.searchParams.get("user");
      let changed = false;
      if (token) {
        localStorage.setItem("user_token", token);
        changed = true;
      }
      if (user) {
        try {
          localStorage.setItem("user", JSON.stringify(JSON.parse(decodeURIComponent(user))));
        } catch {
          localStorage.setItem("user", user);
        }
        changed = true;
      }
      if (changed) {
        url.searchParams.delete("token");
        url.searchParams.delete("user");
        window.history.replaceState({}, document.title, url.pathname + url.search);
      }
    }
  }, []);
  return null;
} 