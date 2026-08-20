interface AuthHeaderProps {
  title: string;
  description: string;
  step?: { current: number; total: number };
}

export function AuthHeader({ title, description, step }: AuthHeaderProps) {
  return (
    <header className="space-y-3">
      {step && (
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Paso {step.current} de {step.total}
          </p>

          <div
            role="progressbar"
            aria-valuenow={step.current}
            aria-valuemin={0}
            aria-valuemax={step.total}
            aria-label={`Paso ${step.current} de ${step.total}`}
            className="h-1 w-full overflow-hidden rounded-full bg-surface-muted"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300 motion-reduce:transition-none"
              style={{ width: `${(step.current / step.total) * 100}%` }}
            />
          </div>
        </div>
      )}

      <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-tight">
        {title}
      </h1>

      <p className="text-muted">{description}</p>
    </header>
  );
}
