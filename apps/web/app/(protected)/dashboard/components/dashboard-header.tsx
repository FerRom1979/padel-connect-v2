type DashboardHeaderProps = {
  name: string;
};

export function DashboardHeader({ name }: DashboardHeaderProps) {
  return (
    <header>
      <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-tight">
        Hola {name}
      </h1>

      <p className="mt-2 text-muted">¿Todo listo para jugar?</p>
    </header>
  );
}
