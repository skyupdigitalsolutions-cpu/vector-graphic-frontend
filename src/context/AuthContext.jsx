/**
 * Vector Graphic — Auth Context  (JWT edition)
 * ─────────────────────────────────────────────────────────────────
 * Drop this file into:  src/context/AuthContext.jsx
 *
 * JWT flow
 * ─────────────────────────────────────────────────────────────────
 * 1. POST /api/auth/login  { email, password }
 *      → { token: "<JWT>", user: { email, role, name } }
 * 2. The JWT is stored in localStorage and sent as
 *      Authorization: Bearer <token>  on every API call.
 * 3. On mount the stored token is validated via
 *      GET /api/auth/me  (Authorization: Bearer <token>)
 *      → { user: { email, role, name } }
 *    If the endpoint returns 401 / network error the session is cleared.
 *
 * Fallback mode (no backend)
 * ─────────────────────────────────────────────────────────────────
 * If VITE_API_BASE_URL is empty / not set, the context falls back to
 * the hardcoded USERS list so the builder still works without a server.
 *
 * Env vars needed (optional — for real JWT backend):
 *   VITE_API_BASE_URL=https://your-backend.com
 * ─────────────────────────────────────────────────────────────────
 */

import { createContext, useContext, useState, useEffect, useCallback } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const TOKEN_KEY   = "vgThoughtBuilderAuth";   // localStorage key
const API_BASE    = import.meta.env.VITE_API_BASE_URL || "";

// ─── Fallback hardcoded users (used when API_BASE is empty) ───────────────────
const FALLBACK_USERS = [
  {
    email:    "blogger@gmail.com",
    password: "blogger123",
    role:     "admin",
    name:     "VG Admin",
  },
];

// ─── localStorage helpers ─────────────────────────────────────────────────────
const readToken  = () => { try { return localStorage.getItem(TOKEN_KEY) || null; } catch { return null; } };
const writeToken = (t) => { try { localStorage.setItem(TOKEN_KEY, t); }           catch {} };
const removeToken= () => { try { localStorage.removeItem(TOKEN_KEY); }            catch {} };

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [token,   setToken]   = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Restore & validate session on mount ──────────────────────────────────
  useEffect(() => {
    const stored = readToken();
    if (!stored) { setLoading(false); return; }

    if (API_BASE) {
      // Validate JWT against the real backend
      fetch(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${stored}` },
      })
        .then(async (res) => {
          if (!res.ok) throw new Error("Invalid token");
          const { user: u } = await res.json();
          setToken(stored);
          setUser(u);
        })
        .catch(() => {
          // Token expired / invalid — clear storage
          removeToken();
        })
        .finally(() => setLoading(false));
    } else {
      // Fallback: token is base64(email:role:ts) — just decode & trust it
      try {
        const [email, role] = atob(stored).split(":");
        const match = FALLBACK_USERS.find((u) => u.email === email && u.role === role);
        if (match) {
          setToken(stored);
          setUser({ email: match.email, role: match.role, name: match.name });
        } else {
          removeToken();
        }
      } catch {
        removeToken();
      }
      setLoading(false);
    }
  }, []);

  // ── Login ─────────────────────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    if (API_BASE) {
      // ── Real JWT backend ────────────────────────────────────────────────
      try {
        const res = await fetch(`${API_BASE}/api/auth/login`, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ email: email.trim(), password }),
        });

        const data = await res.json();

        if (!res.ok) {
          return { success: false, message: data?.message || "Invalid credentials." };
        }

        const { token: jwt, user: u } = data;
        writeToken(jwt);
        setToken(jwt);
        setUser(u);
        return { success: true, user: u };
      } catch (err) {
        return { success: false, message: "Network error. Please try again." };
      }
    } else {
      // ── Fallback hardcoded auth ─────────────────────────────────────────
      const match = FALLBACK_USERS.find(
        (u) => u.email === email.trim() && u.password === password,
      );
      if (!match) return { success: false, message: "Invalid credentials." };

      const fakeJwt = btoa(`${match.email}:${match.role}:${Date.now()}`);
      writeToken(fakeJwt);
      setToken(fakeJwt);
      setUser({ email: match.email, role: match.role, name: match.name });
      return { success: true, user: { email: match.email, role: match.role, name: match.name } };
    }
  }, []);

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    removeToken();
    setToken(null);
    setUser(null);
  }, []);

  // ── Authenticated fetch helper ────────────────────────────────────────────
  /** Wraps fetch() and injects Authorization header automatically. */
  const authFetch = useCallback(
    (url, options = {}) => {
      const headers = {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };
      return fetch(url, { ...options, headers });
    },
    [token],
  );

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    authFetch,
    isAuthenticated: !!token && !!user,
    isAdmin:         user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}