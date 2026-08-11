"use client";

import { useEffect, useState } from "react";
import { authApi } from "@/lib/api";
import type { User } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      queueMicrotask(() => setLoading(false));
      return;
    }
    authApi
      .me()
      .then(setUser)
      .catch(() => localStorage.removeItem("auth_token"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const { token, user: authUser } = await authApi.login(email, password);
    localStorage.setItem("auth_token", token);
    document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
    setUser(authUser);
    return authUser;
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    document.cookie = "auth_token=; path=/; max-age=0; samesite=lax";
    setUser(null);
  };

  return { user, loading, login, logout, isAuthenticated: !!user };
}
