import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T | undefined>();

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      setStoredValue(item ? (JSON.parse(item) as T) : initialValue);
    } catch {
      setStoredValue(initialValue);
    }
  }, [key, initialValue]);

  useEffect(() => {
    if (storedValue !== undefined) {
      try {
        localStorage.setItem(key, JSON.stringify(storedValue));
      } catch {
        console.log("error");
      }
    }
  }, [key, storedValue]);

  return [storedValue ?? initialValue, setStoredValue] as const;
}
