'use client';

import { isAxiosError } from 'axios';

// ponytail: la API devuelve { message: string | string[] } (ValidationPipe de Nest).
function toMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (Array.isArray(message)) {
      return message.join('. ');
    }

    if (typeof message === 'string') {
      return message;
    }

    if (!error.response) {
      return 'No pudimos conectar con el servidor. Revisá tu conexión.';
    }
  }

  return 'Algo salió mal. Intentá de nuevo.';
}

export function FormError({ error }: { error: unknown }) {
  if (!error) {
    return null;
  }

  return (
    <p
      role="alert"
      className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
    >
      {toMessage(error)}
    </p>
  );
}
