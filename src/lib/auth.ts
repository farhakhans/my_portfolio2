import { useEffect, useState } from "react";

const KEY = "portfolio_auth_user";

export type AuthUser = { email: string; name: string };

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function login(email: string, _password: string): AuthUser {
  const user: AuthUser = { email, name: email.split("@")[0] || "Friend" };
  localStorage.setItem(KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("auth-change"));
  return user;
}

export function logout() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("auth-change"));
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setUser(getStoredUser());
    setReady(true);
    const handler = () => setUser(getStoredUser());
    window.addEventListener("auth-change", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("auth-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return { user, ready };
}
