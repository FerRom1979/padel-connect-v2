interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <header className="space-y-8 text-center">
      <div className="space-y-3">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
          <span className="text-2xl font-bold">PC</span>
        </div>

        <div>
          <h1 className="text-xl font-black tracking-wide">PADEL CONNECT</h1>

          <p className="mt-2 text-sm text-muted">
            Encuentra jugadores y organiza tus partidos.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold">{title}</h2>

        <p className="text-muted">{description}</p>
      </div>
    </header>
  );
}
