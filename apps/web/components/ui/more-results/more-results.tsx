/** Los listados cortan en 50. Sin este aviso, el corte es invisible. */
export function MoreResults({ show }: { show: boolean }) {
  if (!show) {
    return null;
  }

  return (
    <p role="status" className="py-2 text-center text-sm text-muted">
      Hay más resultados de los que entran acá. Afiná los filtros para encontrar
      lo que buscás.
    </p>
  );
}
