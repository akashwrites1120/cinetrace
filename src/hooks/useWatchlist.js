import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "cinetrace.watchlist";

function readStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useWatchlist() {
  const [items, setItems] = useState(readStorage);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      return;
    }
  }, [items]);

  const toggle = useCallback((movie) => {
    setItems((prev) =>
      prev.some((m) => m.imdbID === movie.imdbID)
        ? prev.filter((m) => m.imdbID !== movie.imdbID)
        : [{ ...movie }, ...prev]
    );
  }, []);

  const has = useCallback(
    (id) => items.some((m) => m.imdbID === id),
    [items]
  );

  return { items, toggle, has };
}

export default useWatchlist;
