type CourtProps = {
  className?: string;
};

/**
 * Cancha de pádel vista desde arriba: 20x10m, red al medio, cajones de saque.
 * Es la marca de la app. Se usa chica (logo) y a sangre (panel de auth).
 */
export function Court({ className }: CourtProps) {
  return (
    <svg
      viewBox="0 0 200 100"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* paredes */}
      <rect
        x="1"
        y="1"
        width="198"
        height="98"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* red */}
      <line
        x1="100"
        y1="0"
        x2="100"
        y2="100"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* linea de saque */}
      <line
        x1="30"
        y1="1"
        x2="30"
        y2="99"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="170"
        y1="1"
        x2="170"
        y2="99"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* centro de los cajones */}
      <line
        x1="30"
        y1="50"
        x2="100"
        y2="50"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="100"
        y1="50"
        x2="170"
        y2="50"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
