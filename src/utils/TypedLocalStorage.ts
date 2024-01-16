import { Bookings } from '../types/types';

interface LocalStorageSchema {
  bookings: {
    bookings: Bookings[];
  };
}

export function getLocalStorageItem<T extends keyof LocalStorageSchema>(
  key: T,
): LocalStorageSchema[T] {
  return JSON.parse(
    localStorage.getItem(key) ?? `{"error": "Object not found"}`,
  );
}

export function setLocalStorageItem<T extends keyof LocalStorageSchema>(
  key: T,
  value: LocalStorageSchema[T],
) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event('storage'));
}
