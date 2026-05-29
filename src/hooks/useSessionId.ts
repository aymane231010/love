import { useMemo } from "react";

const STORAGE_KEY = "love_date_session_id";

function createSessionId(): string {
  return crypto.randomUUID();
}

export function useSessionId(): string {
  return useMemo(() => {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;

    const id = createSessionId();
    localStorage.setItem(STORAGE_KEY, id);
    return id;
  }, []);
}
