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

export function useFirestore<T>(
  collectionName: string,
  mode: "all" | "published" | "featured" = "all"
): FirestoreState<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
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

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [collectionName, mode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
