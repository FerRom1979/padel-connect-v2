import { Court } from './court';

export function LoadingScreen() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center bg-background"
    >
      <Court className="w-20 animate-pulse text-primary/40 motion-reduce:animate-none" />

      <span className="sr-only">Cargando…</span>
    </div>
  );
}
