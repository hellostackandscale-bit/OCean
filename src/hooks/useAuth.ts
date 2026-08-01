// ============================================
// useAuth Hook — Firebase Auth State
// ============================================

"use client";

import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { onAuthChange } from "@/lib/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = onAuthChange((user) => {
        setUser(user);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Auth error");
      setLoading(false);
    }
  }, []);

  return { user, loading, error };
}
