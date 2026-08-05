// ============================================
// useFirestore Hook — Collection Data Fetching
// ============================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { getDocuments, getPublishedDocuments, getFeaturedDocuments } from "@/lib/firestore";

interface FirestoreState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// In-memory cache for instant loads
const firestoreCache: Record<string, any[]> = {};

export function useFirestore<T>(
  collectionName: string,
  mode: "all" | "published" | "featured" = "all"
): FirestoreState<T> {
  const cacheKey = `${collectionName}_${mode}`;
  const [data, setData] = useState<T[]>(() => firestoreCache[cacheKey] || []);
  const [loading, setLoading] = useState(() => !firestoreCache[cacheKey]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      if (!firestoreCache[cacheKey]) {
        setLoading(true);
      }
      setError(null);
      let result: T[];

      switch (mode) {
        case "published":
          result = await getPublishedDocuments<T>(collectionName);
          break;
        case "featured":
          result = await getFeaturedDocuments<T>(collectionName);
          break;
        default:
          result = await getDocuments<T>(collectionName);
      }

      firestoreCache[cacheKey] = result;
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [collectionName, mode, cacheKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
