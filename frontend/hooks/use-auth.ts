"use client";

import { useEffect, useState } from "react";
import { signToken, ADMIN_USER } from "@/lib/auth/jwt";
import { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } from "@/lib/constants";
import type { User } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");

    if (!token) {
      queueMicrotask(() => setLoading(false));
      return;
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser({
          ...ADMIN_USER,
          name: ADMIN_NAME,
          email: ADMIN_EMAIL,
        });
      }
    } else {
      setUser({
        ...ADMIN_USER,
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
      });
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const normalizedInputEmail = email.trim().toLowerCase();
    const normalizedAdminEmail = ADMIN_EMAIL.trim().toLowerCase();

    if (normalizedInputEmail !== normalizedAdminEmail || password !== ADMIN_PASSWORD) {
      throw new Error("Invalid email or password");
    }

    const authUser: User = {
      ...ADMIN_USER,
      name: ADMIN_NAME,
      email: normalizedAdminEmail,
      createdAt: new Date().toISOString(),
    };

    let token = "";
    try {
      token = await signToken(authUser);
    } catch {
      token = `admin-token-${Date.now()}`;
    }

    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", JSON.stringify(authUser));
    document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;

    setUser(authUser);
    return authUser;
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    document.cookie = "auth_token=; path=/; max-age=0; samesite=lax";
    setUser(null);
  };

  return { user, loading, login, logout, isAuthenticated: !!user };
}
