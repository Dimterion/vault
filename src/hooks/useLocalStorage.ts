import { useCallback, useEffect, useState } from "react";
import { parseISO } from "date-fns";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      if (item == null) {
        return initialValue;
      }

      return JSON.parse(item, dateReviver) as T;
    } catch (error) {
      console.error(`Failed to load localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Failed to save localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const setValue = useCallback((value: T | ((previousValue: T) => T)) => {
    setStoredValue((previousValue) =>
      typeof value === "function"
        ? (value as (previousValue: T) => T)(previousValue)
        : value,
    );
  }, []);

  return [storedValue, setValue] as const;
}

function dateReviver(_key: string, value: unknown) {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return parseISO(value);
  }

  return value;
}
