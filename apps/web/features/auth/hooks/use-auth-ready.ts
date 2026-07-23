'use client';

import { useSyncExternalStore } from 'react';

function subscribe() {
  return () => {};
}

export function useAuthReady() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
